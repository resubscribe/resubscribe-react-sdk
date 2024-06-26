import React from 'react';

type AIType = 'intent' | 'churn' | 'delete' | 'subscriber' | 'presubscription' | 'precancel';
type CloseFn = (via: 'cancel-consent' | 'close') => void;
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
     * Callback when the component is closed. Use the via parameter to identify how the modal was closed.
     */
    onClose?: CloseFn;
    /**
     * Color settings.
     */
    colors?: Colors;
}
declare const _default: {
    Component: React.FunctionComponent<{}>;
    openWithConsent: (options: Options) => void;
    close: (via: "cancel-consent" | "close") => void;
};

export { _default as default };
