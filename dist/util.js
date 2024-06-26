"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cx = exports.isDarkColor = exports.reduceOpacity = exports.getNavigatorLanguage = exports.domain = exports.apiUrl = exports.baseUrl = void 0;
var color_1 = __importDefault(require("color"));
exports.baseUrl = 'https://app.resubscribe.ai';
exports.apiUrl = 'https://api.resubscribe.ai';
exports.domain = 'app.resubscribe.ai';
var getNavigatorLanguage = function () {
    if (navigator.languages && navigator.languages.length) {
        return navigator.languages[0];
    }
    else {
        return navigator.userLanguage || navigator.language || navigator.browserLanguage || null;
    }
};
exports.getNavigatorLanguage = getNavigatorLanguage;
var reduceOpacity = function (color, opacity) {
    return (0, color_1.default)(color).alpha(opacity).string();
};
exports.reduceOpacity = reduceOpacity;
var isDarkColor = function (color) {
    return (0, color_1.default)(color).isDark();
};
exports.isDarkColor = isDarkColor;
var cx = function () {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
};
exports.cx = cx;
//# sourceMappingURL=util.js.map