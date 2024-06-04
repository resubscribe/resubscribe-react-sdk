import React from 'react';
type AIType = 'intent' | 'churn' | 'delete' | 'subscriber' | 'presubscription';
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
    /**
     * Style overrides.
     */
    styles?: {
        backdrop?: React.CSSProperties;
        conversationModal?: React.CSSProperties;
    };
}
declare const _default: {
    Component: React.FunctionComponent<{}>;
    openConsent: (options: Options) => void;
    openConversation: (options: Options) => void;
    close: () => void;
};
export default _default;
