"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var goober_1 = require("goober");
var zustand_1 = require("zustand");
var util_1 = require("./util");
(0, goober_1.setup)(react_1.default.createElement);
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
        case 'presubscription':
            return 'Can we ask you a few questions?';
        case 'precancel':
            return 'Can we ask you a few questions?';
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
        case 'presubscription':
            return 'We\'d love to hear your thoughts. It should only take a few minutes.';
        case 'precancel':
            return 'We\'d love to hear your thoughts. It should only take a few minutes.';
    }
};
var Button = (0, goober_1.styled)('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  text-align: center;\n  padding: 0.5rem 0.75rem;\n  background-color: ", ";\n  color: ", ";\n  ", "\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 6px;\n  cursor: pointer;\n"], ["\n  flex: 1;\n  text-align: center;\n  padding: 0.5rem 0.75rem;\n  background-color: ", ";\n  color: ", ";\n  ", "\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 6px;\n  cursor: pointer;\n"])), function (props) { return props.bgcolor || '#000'; }, function (props) { return props.color || '#fff'; }, function (props) { return props.secondarycolor ? "\n    border-width: 1px;\n    border-style: solid;\n    border-color: ".concat((0, util_1.reduceOpacity)(props.secondaryColor, 0.3) || '#d4d7de', ";\n  ") : "\n    border: none;\n  "; });
var containerAnimation = "\n0% {opacity:.5;}\n100% {opacity:1;}\n";
var Container = function (_a) {
    var isDark = _a.isDark, children = _a.children;
    return (react_1.default.createElement("div", { style: __assign(__assign({}, containerStyle), { backgroundColor: !isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)', animation: "".concat((0, goober_1.keyframes)(containerAnimation), " 150ms ease-in-out forwards") }) }, children));
};
var modalAnimation = "\n0% {transform: translateY(-4px); opacity:.5;}\n100% {transform: translateY(0px); opacity:1;}\n";
var DialogModalComponent = (0, goober_1.styled)('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 1.25rem;\n  max-width: 28rem;\n  background-color: ", ";\n  color: ", ";\n\n  @media (min-width: 576px) {\n    padding: 1.5rem;\n  }\n"], ["\n  padding: 1.25rem;\n  max-width: 28rem;\n  background-color: ", ";\n  color: ", ";\n\n  @media (min-width: 576px) {\n    padding: 1.5rem;\n  }\n"])), function (props) { return props.bgcolor || 'white'; }, function (props) { return props.color || '#111827'; });
var DialogModal = function (_a) {
    var backgroundColor = _a.backgroundColor, color = _a.color, children = _a.children;
    return (react_1.default.createElement(DialogModalComponent, { bgcolor: backgroundColor, color: color, style: __assign(__assign({}, modalSharedStyle), { animation: "".concat((0, goober_1.keyframes)(modalAnimation), " 150ms ease-in-out forwards") }) }, children));
};
var ChatModalComponent = (0, goober_1.styled)('div')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 80vh;\n  max-width: 600px;\n  background-color: ", ";\n  position: relative;\n"], ["\n  height: 80vh;\n  max-width: 600px;\n  background-color: ", ";\n  position: relative;\n"])), function (props) { return props.backgroundColor || 'white'; });
var ChatModal = function (_a) {
    var backgroundColor = _a.backgroundColor, children = _a.children;
    return (react_1.default.createElement(ChatModalComponent, { backgroundColor: backgroundColor, style: __assign(__assign({}, modalSharedStyle), { animation: "".concat((0, goober_1.keyframes)(modalAnimation), " 150ms ease-in-out forwards") }) }, children));
};
var titleClass = (0, goober_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 1.25rem;\n  font-weight: 600;\n  text-align: center;\n"], ["\n  font-size: 1.25rem;\n  font-weight: 600;\n  text-align: center;\n"])));
var descriptionClass = (0, goober_1.css)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-top: 1rem;\n  font-size: 1rem;\n  text-align: center;\n  opacity: 0.8;\n"], ["\n  margin-top: 1rem;\n  font-size: 1rem;\n  text-align: center;\n  opacity: 0.8;\n"])));
var buttonsClass = (0, goober_1.css)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin-top: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (min-width: 576px) {\n    flex-direction: row;\n  }\n"], ["\n  margin-top: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (min-width: 576px) {\n    flex-direction: row;\n  }\n"])));
var WebView = function (_a) {
    var options = _a.options;
    (0, react_1.useEffect)(function () {
        var handleMessage = function (event) {
            var eventDomain = new URL(event.origin).hostname;
            if (eventDomain === util_1.domain) {
                try {
                    var data = JSON.parse(event.data);
                    if (data.type === 'close') {
                        close();
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
            'hideclose': 'true',
        };
        var ret = "".concat(util_1.baseUrl, "/chat/").concat(options.slug, "?").concat(Object.entries(queryParams).map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, "=").concat(value);
        }).join('&'));
        return ret;
    }, [options]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("iframe", { src: url, width: "100%", height: "100%", style: {
                border: 'none',
                display: 'block',
            } }),
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                top: 16,
                right: 10,
                height: 32,
                width: 32,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
            }, onClick: function () {
                if (!confirm('Are you sure you want to close the chat?')) {
                    return;
                }
                close();
            } },
            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24px", viewBox: "0 -960 960 960", width: "24px", fill: "#5f6368" },
                react_1.default.createElement("path", { d: "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" })))));
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
    var fetched = react_1.default.useRef(false);
    (0, react_1.useEffect)(function () {
        if (!options || fetched.current) {
            return;
        }
        if (state === 'confirming') {
            fetched.current = true;
            var params = {
                slug: options.slug,
                uid: options.userId,
                ait: options.aiType,
                brloc: (0, util_1.getNavigatorLanguage)(),
            };
            var url = "".concat(util_1.apiUrl, "/v1/sessions/consent?").concat(Object.entries(params).map(function (_a) {
                var key = _a[0], value = _a[1];
                return "".concat(key, "=").concat(value);
            }).join('&'));
            fetch(url, {
                cache: 'no-cache',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).catch(function (e) {
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
    var aiType = options.aiType, title = options.title, description = options.description, primaryButtonText = options.primaryButtonText, cancelButtonText = options.cancelButtonText, colors = options.colors;
    var isDark = !(colors === null || colors === void 0 ? void 0 : colors.background) ? false : (0, util_1.isDarkColor)(colors.background);
    if (state === 'confirming') {
        return (react_1.default.createElement(Container, { isDark: isDark },
            react_1.default.createElement(DialogModal, { backgroundColor: colors === null || colors === void 0 ? void 0 : colors.background, color: colors === null || colors === void 0 ? void 0 : colors.text },
                react_1.default.createElement("div", { className: (0, util_1.cx)(titleClass) }, title || getTitle(aiType)),
                react_1.default.createElement("div", { className: (0, util_1.cx)(descriptionClass) }, description || getDescription(aiType)),
                react_1.default.createElement("div", { className: (0, util_1.cx)(buttonsClass) },
                    react_1.default.createElement(Button, { onClick: function () {
                            close();
                        }, role: "button", tabIndex: 0, bgcolor: "transparent", color: colors === null || colors === void 0 ? void 0 : colors.text, secondarycolor: colors === null || colors === void 0 ? void 0 : colors.text }, cancelButtonText || 'Not right now'),
                    react_1.default.createElement(Button, { onClick: function () {
                            useStore.setState({ state: 'open' });
                        }, bgcolor: colors === null || colors === void 0 ? void 0 : colors.primary, color: isDark ? colors === null || colors === void 0 ? void 0 : colors.text : colors === null || colors === void 0 ? void 0 : colors.background, role: "button", tabIndex: 0 }, primaryButtonText || 'Let\'s chat!')))));
    }
    return (react_1.default.createElement(Container, { isDark: isDark },
        react_1.default.createElement(ChatModal, { backgroundColor: colors === null || colors === void 0 ? void 0 : colors.background },
            react_1.default.createElement(WebView, { options: options }))));
};
var containerStyle = {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
var modalSharedStyle = {
    flex: 1,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};
var onClose = null;
/**
 * Open the consent dialog and then start the conversation.
 */
var openWithConsent = function (options) {
    if (!mounted) {
        console.error('ResubscribeComponent is not mounted');
    }
    if (useStore.getState().state !== 'closed') {
        console.warn('ResubscribeComponent is already open');
        return;
    }
    useStore.setState({ state: 'confirming', options: options });
    if (options.onClose) {
        onClose = options.onClose;
    }
};
var close = function () {
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
exports.default = {
    Component: ResubscribeComponent,
    openWithConsent: openWithConsent,
    close: close,
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
