"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var zustand_1 = require("zustand");
var base = 'https://app.resubscribe.ai';
var domain = 'app.resubscribe.ai';
var useStore = (0, zustand_1.create)(function (set) { return ({
    state: 'closed',
    options: null,
    openConsent: function (options) { return set({ state: 'confirming', options: options }); },
    close: function () { return set({ state: 'closed', options: null }); },
}); });
/**
 * Get default titles for each AI type.
 */
var getTitle = function (aiType) {
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
var getDescription = function (aiType) {
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
};
var WebView = function (_a) {
    var options = _a.options;
    (0, react_1.useEffect)(function () {
        var handleMessage = function (event) {
            var eventDomain = new URL(event.origin).hostname;
            if (eventDomain === domain) {
                try {
                    var data = JSON.parse(event.data);
                    if (data.type === 'close') {
                        useStore.setState({ state: 'closed' });
                        if (options.onClose) {
                            options.onClose();
                        }
                    }
                }
                catch (e) {
                    console.error('Failed to parse data: ', e);
                }
            }
        };
        window.addEventListener('message', handleMessage);
        return function () {
            window.removeEventListener('message', handleMessage);
        };
    }, [options]);
    var url = (0, react_1.useMemo)(function () {
        var queryParams = {
            'ait': options.aiType,
            'uid': options.userId,
            'iframe': 'true',
        };
        var ret = "".concat(base, "/chat/").concat(options.slug, "?").concat(Object.entries(queryParams).map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, "=").concat(value);
        }).join('&'));
        return ret;
    }, [options]);
    return (react_1.default.createElement("iframe", { src: url, width: "100%", height: "100%", style: {
            border: 'none',
        } }));
};
var mounted = false;
var ResubscribeComponent = function () {
    var _a = useStore(), state = _a.state, options = _a.options;
    (0, react_1.useEffect)(function () {
        mounted = true;
        return function () {
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
    var aiType = options.aiType, title = options.title, description = options.description, primaryButtonText = options.primaryButtonText, cancelButtonText = options.cancelButtonText;
    if (state === 'confirming') {
        return (react_1.default.createElement("div", { style: backdropStyle },
            react_1.default.createElement("div", { style: confirmationStyle },
                react_1.default.createElement("h1", { style: titleStyle }, title || getTitle(aiType)),
                react_1.default.createElement("h2", { style: descriptionStyle }, description || getDescription(aiType)),
                react_1.default.createElement("button", { onClick: function () {
                        useStore.setState({ state: 'open' });
                    } }, primaryButtonText || 'Let\'s chat!'),
                react_1.default.createElement("button", { onClick: function () {
                        useStore.setState({ state: 'closed' });
                    } }, cancelButtonText || 'Not right now'))));
    }
    return (react_1.default.createElement("div", { style: backdropStyle },
        react_1.default.createElement("div", { style: experienceStyle },
            react_1.default.createElement(WebView, { options: options }))));
};
var backdropStyle = {
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
};
var confirmationStyle = {
    backgroundColor: 'white',
    flex: 1,
    maxWidth: 400,
    padding: 40,
    borderRadius: 8,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};
var titleStyle = {
    fontSize: 24,
    marginBottom: 20,
};
var descriptionStyle = {
    fontSize: 16,
    marginBottom: 20,
};
var experienceStyle = {
    backgroundColor: 'white',
    flex: 1,
    maxWidth: 600,
    height: '80vh',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};
var openConsent = function (options) {
    if (!mounted) {
        console.error('ResubscribeComponent is not mounted');
    }
    useStore.setState({ state: 'confirming', options: options });
};
var close = function () {
    if (!mounted) {
        console.error('ResubscribeComponent is not mounted');
    }
    useStore.setState({ state: 'closed', options: null });
};
// eslint-disable-next-line import/no-anonymous-default-export
exports.default = {
    Component: ResubscribeComponent,
    openConsent: openConsent,
    close: close
};