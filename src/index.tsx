import React, { useEffect, useMemo } from 'react';
import { css, styled, setup, keyframes } from 'goober';
import { create } from 'zustand';
import Color from 'color';

export const getNavigatorLanguage = (): string | null => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return (navigator as any).userLanguage || navigator.language || (navigator as any).browserLanguage || null;
  }
};

const reduceOpacity = (color: string, opacity: number) => {
  return Color(color).alpha(opacity).string();
}

const isDarkColor = (color: string) => {
  return Color(color).isDark();
};

const cx = (...classes: Array<string | null | undefined>) => classes.filter(Boolean).join(' ');

setup(React.createElement);

const baseUrl = 'https://app.resubscribe.ai';
const apiUrl = 'https://api.resubscribe.ai';
const domain = 'app.resubscribe.ai';

type AIType = 'intent' | 'churn' | 'delete' | 'subscriber' | 'presubscription' | 'precancel';

type State = 'closed' | 'confirming' | 'open';
const useStore = create<{
  state: State;
  options: Options | null;
  openConsent: (options: Options) => void;
  close: () => void;
}>((set) => ({
  state: 'closed' as State,
  options: null as Options | null,
  openConsent: (options: Options) => set({ state: 'confirming', options }),
  close: () => set({ state: 'closed', options: null }),
}));

interface Colors {
  primary: string;
  text: string;
  background: string;
}

interface Options {
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
   * Callback when the component is closed.
   */
  onClose?: () => void;
  /**
   * Color settings.
   */
  colors?: Colors;
}

/**
 * Get default titles for each AI type.
 */
const getTitle = (aiType: AIType) => {
  switch (aiType) {
    case 'intent':
      return 'Not ready to pay?';
    case 'churn':
      return 'We\'re sorry to see you go';
    case 'delete':
      return 'We\'re sorry to see you go';
    case 'subscriber':
      return 'Would you like to tell us about your experience?';
    case 'presubscription':
      return 'Can we ask you a few questions?';
    case 'precancel':
      return 'Can we ask you a few questions?';
  }
};

/**
 * Get default descriptions for each AI type.
 */
const getDescription = (aiType: AIType) => {
  switch (aiType) {
    case 'intent':
      return 'Can we ask you a few questions? It should only take a few minutes.';
    case 'churn':
      return 'Can we ask you a few questions? It should only take a few minutes.';
    case 'delete':
      return 'Can we ask you a few questions? It should only take a few minutes.';
    case 'subscriber':
      return 'Can we ask you a few questions? It should only take a few minutes.';
    case 'presubscription':
      return 'We\'d love to hear your thoughts. It should only take a few minutes.';
    case 'precancel':
      return 'We\'d love to hear your thoughts. It should only take a few minutes.';
  }
}

const Button = styled('div')`
  flex: 1;
  text-align: center;
  padding: 0.5rem 0.75rem;
  background-color: ${(props: any) => props.bgcolor || '#000'};
  color: ${(props: any) => props.color || '#fff'};
  ${props => props.secondarycolor ? `
    border-width: 1px;
    border-style: solid;
    border-color: ${reduceOpacity(props.secondaryColor, 0.3) || '#d4d7de'};
  ` : `
    border: none;
  `}
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
`

const containerAnimation = `
0% {opacity:.5;}
100% {opacity:1;}
`;
const Container: React.FunctionComponent<{
  isDark: boolean;
} & React.PropsWithChildren> = ({
  isDark,
  children,
}) => {
  return (
    <div
      style={{
        ...containerStyle,
        backgroundColor: !isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        animation: `${keyframes(containerAnimation)} 150ms ease-in-out forwards`,
      }}
    >
      {children}
    </div>
  );
};

const modalAnimation = `
0% {transform: translateY(-4px); opacity:.5;}
100% {transform: translateY(0px); opacity:1;}
`;
const DialogModalComponent = styled('div')`
  padding: 1.25rem;
  max-width: 28rem;
  background-color: ${(props: any) => props.bgcolor || 'white'};
  color: ${(props: any) => props.color || '#111827'};

  @media (min-width: 576px) {
    padding: 1.5rem;
  }
`;
const DialogModal: React.FunctionComponent<{
  backgroundColor?: string;
  color?: string;
} & React.PropsWithChildren> = ({
  backgroundColor,
  color,
  children,
}) => {
  return (
    <DialogModalComponent
      bgcolor={backgroundColor}
      color={color}
      style={{
        ...modalSharedStyle,
        animation: `${keyframes(modalAnimation)} 150ms ease-in-out forwards`,
      }}
    >
      {children}
    </DialogModalComponent>
  );
};

const ChatModalComponent = styled('div')`
  height: 80vh;
  max-width: 600px;
  background-color: ${(props: any) => props.backgroundColor || 'white'};
  position: relative;
`;
const ChatModal: React.FunctionComponent<{
  backgroundColor?: string;
} & React.PropsWithChildren> = ({
  backgroundColor,
  children,
}) => {
  return (
    <ChatModalComponent
      backgroundColor={backgroundColor}
      style={{
        ...modalSharedStyle,
        animation: `${keyframes(modalAnimation)} 150ms ease-in-out forwards`,
      }}
    >
      {children}
    </ChatModalComponent>
  );
};

const titleClass = css`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
`;

const descriptionClass = css`
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  opacity: 0.8;
`;

const buttonsClass = css`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 576px) {
    flex-direction: row;
  }
`;

interface WebViewProps {
  options: Options;
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
            close();
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
      'iframe': 'true',
      'hideclose': 'true',
    };
    const ret = `${baseUrl}/chat/${options.slug}?${Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')}`;
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
          close();
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
      fetched.current = true;
      const params = {
        slug: options.slug,
        uid: options.userId,
        ait: options.aiType,
        brloc: getNavigatorLanguage(),
      }
      const url = `${apiUrl}/v1/sessions/consent?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`;
      fetch(
        url,
        {
          cache: 'no-cache',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        },
      ).catch((e) => {
        console.error('Failed to fetch consent: ', e);
      });
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
  } = options;

  const isDark = !colors?.background ? false : isDarkColor(colors.background);

  if (state === 'confirming') {
    return (
      <Container isDark={isDark}>
        <DialogModal
          backgroundColor={colors?.background}
          color={colors?.text}
        >
          <div className={cx(titleClass)}>
            {title || getTitle(aiType)}
          </div>
          <div className={cx(descriptionClass)}>
            {description || getDescription(aiType)}
          </div>
          <div className={cx(buttonsClass)}>
            <Button
              onClick={() => {
                close();
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
      </Container>
    );
  }

  return (
    <Container isDark={isDark}>
      <ChatModal
        backgroundColor={colors?.background}
      >
        <WebView options={options} />
      </ChatModal>
    </Container>
  );
};

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const modalSharedStyle: React.CSSProperties = {
  flex: 1,
  marginLeft: 4,
  marginRight: 4,
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

let onClose: (() => void) | null = null;
/**
 * Open the consent dialog and then start the conversation.
 */
const openWithConsent = (options: Options) => {
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

const close = () => {
  if (!mounted) {
    console.error('ResubscribeComponent is not mounted');
  }
  useStore.setState({ state: 'closed', options: null });
  if (onClose) {
    onClose();
    onClose = null;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Component: ResubscribeComponent,
  openWithConsent,
  close,
}