import React, { useEffect, useMemo } from 'react';
import { create } from 'zustand';

const base = 'https://app.resubscribe.ai';
const domain = 'app.resubscribe.ai';

type AIType = 'intent' | 'churn' | 'delete' | 'subscriber';

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
   * Title override.
   */
  title?: string;
  /**
   * Description override.
   */
  description?: string;
  /**
   * The button text to use for the primary action.
   */
  primaryButtonText?: string;
  /**
   * The button text to use for the secondary action.
   */
  cancelButtonText?: string;
  /**
   * Callback when the component is closed.
   */
  onClose?: () => void;
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
  }
}

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
            useStore.setState({ state: 'closed' });
            if (options.onClose) {
              options.onClose();
            }
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
    };
    const ret = `${base}/chat/${options.slug}?${Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')}`;
    return ret;
  }, [options]);

  return (
    <iframe
      src={url}
      width="100%"
      height="100%"
      style={{
        border: 'none',
      }}
    />
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
  } = options;

  if (state === 'confirming') {
    return (
      <div style={backdropStyle}>
        <div style={confirmationStyle}>
          <h1 style={titleStyle}>
            {title || getTitle(aiType)}
          </h1>
          <h2 style={descriptionStyle}>
            {description || getDescription(aiType)}
          </h2>
          <button onClick={() => {
            useStore.setState({ state: 'open' });
          }}>
            {primaryButtonText || 'Let\'s chat!'}
          </button>
          <button onClick={() => {
            useStore.setState({ state: 'closed' });
          }}>
            {cancelButtonText || 'Not right now'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={backdropStyle}>
      <div style={experienceStyle}>
        <WebView options={options} />
      </div>
    </div>
  );
};

const backdropStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const confirmationStyle: React.CSSProperties = {
  backgroundColor: 'white',
  flex: 1,
  maxWidth: 400,
  padding: 40,
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const titleStyle: React.CSSProperties = {
  fontSize: 24,
  marginBottom: 20,
};

const descriptionStyle: React.CSSProperties = {
  fontSize: 16,
  marginBottom: 20,
};

const experienceStyle: React.CSSProperties = {
  backgroundColor: 'white',
  flex: 1,
  maxWidth: 600,
  height: '80vh',
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const openConsent = (options: Options) => {
  if (!mounted) {
    console.error('ResubscribeComponent is not mounted');
  }
  useStore.setState({ state: 'confirming', options });
};

const close = () => {
  if (!mounted) {
    console.error('ResubscribeComponent is not mounted');
  }
  useStore.setState({ state: 'closed', options: null });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Component: ResubscribeComponent,
  openConsent,
  close
}