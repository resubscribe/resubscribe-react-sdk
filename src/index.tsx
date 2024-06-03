import React, { useEffect, useMemo } from 'react';

type AIType = 'intent' | 'churn' | 'delete' | 'subscriber';

type State = 'closed' | 'confirming' | 'open';
let state: State = 'closed';
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
  description: string;
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
let opts: Options | null = null;

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
  const url = useMemo(() => {
    const base = 'https://app.resubscribe.ai';
    const queryParams = {
      'ait': options.aiType,
      'uid': options.userId,
      'iframe': 'true',
    };
    return `${base}/${options.slug}?${Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')}`;
  }, [options]);
  return (
    <iframe
      src={url}
      width="100%"
      height="100%"
    />
  )
};

let mounted = false;
const ResubscribeComponent: React.FunctionComponent = () => {
  useEffect(() => {
    mounted = true;
    return () => {
      mounted = false;
    };
  }, []);

  if (state === 'closed') {
    return null;
  }

  if (!opts) {
    console.error('No options provided');
    return null;
  }

  if (state === 'confirming') {
    return (
      <div style={confirmationStyle}>
        <h1>
          {opts.title || getTitle(opts.aiType)}
        </h1>
        <h2>
          {opts.description || getDescription(opts.aiType)}
        </h2>
        <button onClick={() => state = 'open'}>
          {opts.primaryButtonText || 'Let\'s chat!'}
        </button>
        <button onClick={() => state = 'closed'}>
          {opts.cancelButtonText || 'Not right now'}
        </button>
      </div>
    );
  }

  return (
    <div style={experienceStyle}>
      <WebView options={opts} />
    </div>
  );
};

const confirmationStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  top: 0,
  left: 0,
};

const experienceStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  top: 0,
  left: 0,
};

const openWithConsent = (options: Options) => {
  if (!mounted) {
    console.error('ResubscribeComponent is not mounted');
  }
  state = 'confirming';
  opts = options;
};

const close = () => {
  if (!mounted) {
    console.error('ResubscribeComponent is not mounted');
  }
  state = 'closed';
  opts = null;
};

export default {
  ResubscribeComponent,
  openWithConsent,
  close
}