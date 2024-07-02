import React, { useEffect, useMemo } from 'react';
import { setup } from 'goober';
import { create } from 'zustand';
import {
  AIType, CloseFn, State, api, baseUrl, cx, domain, getDescription, getNavigatorLanguage, getTitle, isDarkColor,
} from './util';
import { Backdrop, Button, DialogModal, ChatModal, globalClasses } from './components';

setup(React.createElement);

const useStore = create<{
  state: State;
  options: ResubscribeOptions | null;
  openConsent: (options: ResubscribeOptions) => void;
  close: () => void;
}>((set) => ({
  state: 'closed' as State,
  options: null as ResubscribeOptions | null,
  openConsent: (options: ResubscribeOptions) => set({ state: 'confirming', options }),
  close: () => set({ state: 'closed', options: null }),
}));

interface ResubscribeColors {
  primary: string;
  text: string;
  background: string;
}

export interface ResubscribeOptions {
  /**
   * The slug of the organization
   */
  slug: string;
  /**
   * The type of AI to use.
   */
  aiType: AIType;
  /**
   * The user's id to record the conversation.
   */
  userId: string;
  /**
   * The user's email for logging and support follow-up.
   */
  userEmail?: string;
  /**
   * Override for the title in the dialog.
   */
  title?: string;
  /**
   * Override for the description in the dialog.
   */
  description?: string;
  /**
   * Override for the primary button text in the dialog.
   */
  primaryButtonText?: string;
  /**
   * Override for the cancel button text in the dialog.
   */
  cancelButtonText?: string;
  /**
   * Callback when the component is closed. Use the via parameter to identify how the modal was closed.
   */
  onClose?: CloseFn;
  /**
   * Color settings.
   */
  colors?: ResubscribeColors;
  /**
   * Class name customizations.
   */
  classNames?: {
    overlay?: string;
    modal?: string;
  }
}

const registerConsent = (options: ResubscribeOptions) => {
  const params: Record<string, any> = {
    slug: options.slug,
    uid: options.userId,
    email: options.userEmail,
    ait: options.aiType,
    brloc: getNavigatorLanguage(),
  }
  api.get(
    'sessions/consent',
    params,
  ).catch((e) => {
    console.error('Failed to fetch sessions/consent: ', e);
  });
};

interface WebViewProps {
  options: ResubscribeOptions;
}
const WebView: React.FunctionComponent<WebViewProps> = ({
  options,
}) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const eventDomain = new URL(event.origin).hostname;
      if (eventDomain === domain) {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'close') {
            close('close');
          }
        } catch (e) {
          console.error('Failed to parse data: ', e);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [options]);

  const url = useMemo(() => {
    const queryParams = {
      'ait': options.aiType,
      'uid': options.userId,
      'email': options.userEmail,
      'iframe': 'true',
      'hideclose': 'true',
    };
    const ret = `${baseUrl}/chat/${options.slug}?${Object.entries(queryParams).filter(([_, value]) => value !== undefined).map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`).join('&')}`;
    return ret;
  }, [options]);

  return (
    <>
      <iframe
        src={url}
        width="100%"
        height="100%"
        style={{
          border: 'none',
          display: 'block',
        }}
      />
      {/* Close button */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 10,
          height: 32,
          width: 32,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (!confirm('Are you sure you want to close the chat?')) {
            return;
          }
          close('close');
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </div>
    </>
  )
};

let mounted = false;
const ResubscribeComponent: React.FunctionComponent = () => {
  const { state, options } = useStore();

  useEffect(() => {
    mounted = true;
    return () => {
      mounted = false;
    };
  }, []);

  const fetched = React.useRef(false);
  useEffect(() => {
    if (!options || fetched.current) {
      return;
    }
    if (state === 'confirming') {
      registerConsent(options);
    }
  }, [options, state]);

  if (state === 'closed') {
    return null;
  }

  if (!options) {
    console.error('No options provided');
    return null;
  }

  const {
    aiType,
    title,
    description,
    primaryButtonText,
    cancelButtonText,
    colors,
    classNames,
  } = options;

  const isDark = !colors?.background ? false : isDarkColor(colors.background);

  if (state === 'confirming') {
    return (
      <Backdrop isDark={isDark} className={classNames?.overlay}>
        <DialogModal
          backgroundColor={colors?.background}
          color={colors?.text}
          className={classNames?.modal}
        >
          <div className={cx(globalClasses.title)}>
            {title || getTitle(aiType)}
          </div>
          <div className={cx(globalClasses.description)}>
            {description || getDescription(aiType)}
          </div>
          <div className={cx(globalClasses.buttons)}>
            <Button
              onClick={() => {
                close('cancel-consent');
              }}
              role="button"
              tabIndex={0}
              bgcolor="transparent"
              color={colors?.text}
              secondarycolor={colors?.text}
            >
              {cancelButtonText || 'Not right now'}
            </Button>
            <Button
              onClick={() => {
                useStore.setState({ state: 'open' });
              }}
              bgcolor={colors?.primary}
              color={isDark ? colors?.text : colors?.background}
              role="button"
              tabIndex={0}
            >
              {primaryButtonText || 'Let\'s chat!'}
            </Button>
          </div>
        </DialogModal>
      </Backdrop>
    );
  }

  return (
    <Backdrop
      isDark={isDark}
      className={classNames?.overlay}
    >
      <ChatModal
        backgroundColor={colors?.background}
        className={classNames?.modal}
      >
        <WebView options={options} />
      </ChatModal>
    </Backdrop>
  );
};

let onClose: CloseFn | null = null;
/**
 * Open the consent dialog and then start the conversation.
 */
const openWithConsent = (options: ResubscribeOptions) => {
  if (!mounted) {
    console.error('ResubscribeComponent is not mounted');
  }
  if (useStore.getState().state !== 'closed') {
    console.warn('ResubscribeComponent is already open');
    return;
  }

  useStore.setState({ state: 'confirming', options });
  if (options.onClose) {
    onClose = options.onClose;
  }
};

/**
 * Close the dialog and start the conversation.
 */
const close = (via: 'cancel-consent' | 'close') => {
  if (!mounted) {
    console.error('ResubscribeComponent is not mounted');
  }
  useStore.setState({ state: 'closed', options: null });
  if (onClose) {
    onClose(via);
    onClose = null;
  }
};

/**
 * Set the options for the component.
 */
let headlessOptions: ResubscribeOptions | null = null;
const setOptions = (options: ResubscribeOptions) => {
  headlessOptions = options;
};

/**
 * Open the dialog without the consent dialog.
 */
const openChat = (partialOptions?: Partial<ResubscribeOptions>) => {
  if (!headlessOptions) {
    console.error('No headless options set');
    return;
  }
  
  if (!mounted) {
    console.error('ResubscribeComponent is not mounted');
  }
  if (useStore.getState().state !== 'closed') {
    console.warn('ResubscribeComponent is already open');
    return;
  }

  const merged = {
    ...headlessOptions,
    ...partialOptions,
  };

  useStore.setState({
    state: 'open',
    options: merged,
  });
  if (merged.onClose) {
    onClose = merged.onClose;
  }
};

/**
 * Register a consent request.
 */
const registerConsentRequest = () => {
  if (!headlessOptions) {
    console.error('No headless options set');
    return;
  }
  registerConsent(headlessOptions);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Component: ResubscribeComponent,
  openWithConsent,
  close,
  headless: {
    setOptions,
    openChat,
    registerConsentRequest,
  },
}