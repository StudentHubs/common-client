"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var elmnt_1 = require("elmnt");
var refluent_1 = require("refluent");
var common_1 = require("common");
var utils_1 = require("../../utils");
var download_1 = require("../download");
var jsonUrl_1 = require("./jsonUrl");
var icons_1 = require("./icons");
var Link = refluent_1.default
    .do(utils_1.watchHover)
    .do(utils_1.restyle('isHovered', function (isHovered, style) {
    var _a;
    return (_a = style
        .mergeKeys({ link: true, hover: isHovered })).filter.apply(_a, __spread(elmnt_1.css.groups.text, ['padding', 'background'])).scale({ paddingLeft: 2, paddingRight: 2 })
        .merge({
        float: 'left',
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'center',
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        cursor: 'pointer',
    });
}))
    .yield(function (_a) {
    var text = _a.text, onClick = _a.onClick, hoverProps = _a.hoverProps, style = _a.style;
    return (React.createElement(elmnt_1.Txt, __assign({ onClick: onClick }, hoverProps, { style: style }), text));
});
var Button = refluent_1.default
    .do(utils_1.watchHover)
    .do(utils_1.restyle('isHovered', 'save', function (isHovered, save, style) {
    var base = style
        .mergeKeys({ button: true, hover: isHovered, cancel: !save })
        .scale(__assign({ fontSize: { fontSize: 1, borderTopWidth: 2, borderBottomWidth: 2 }, spacing: { fontSize: 0.75 }, margin: { borderWidth: -2 } }, (save ? { paddingLeft: 2.5, paddingRight: 2.5 } : {})))
        .merge({
        layout: 'bar',
        float: 'right',
        cursor: 'pointer',
        border: 'none',
    });
    return {
        div: base.filter.apply(base, __spread(elmnt_1.css.groups.box, elmnt_1.css.groups.other)),
        text: base.filter.apply(base, __spread(elmnt_1.css.groups.text)),
    };
}))
    .yield(function (_a) {
    var save = _a.save, onClick = _a.onClick, hoverProps = _a.hoverProps, style = _a.style;
    return (React.createElement(elmnt_1.Div, __assign({ onClick: onClick }, hoverProps, { style: style.div }),
        save && React.createElement(elmnt_1.Txt, { style: style.text }, "Save"),
        React.createElement(elmnt_1.Icon, __assign({}, icons_1.default[save ? 'tick' : 'cross'], { style: style.text }))));
});
exports.default = refluent_1.default
    .do(utils_1.restyle(function (style) { return ({
    base: style,
    div: style
        .filter('height', 'background', 'border')
        .scale({ borderWidth: 2 })
        .merge({
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    }),
}); }))
    .do('context', function (context, push) {
    return context.store.listen('unchanged', function (unchanged) {
        if (unchanged === void 0) { unchanged = {}; }
        return push({ isEditing: Object.keys(unchanged).length > 0 });
    });
})
    .do(function (props$, _) {
    var clear = function () {
        var _a;
        var context = props$().context;
        (_a = common_1.root.rgo).set.apply(_a, __spread(Object.keys(context.store.get('unchanged') || {}).map(function (k) { return ({
            key: k.split('.'),
            value: undefined,
        }); })));
        context.store.set('unchanged', {});
    };
    return {
        save: function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, context, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        context = props$().context;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (_a = common_1.root.rgo).commit.apply(_a, __spread(Object.keys(context.store.get('unchanged') || {}).map(function (k) {
                                return k.split('.');
                            })))];
                    case 2:
                        _b.sent();
                        context.store.set('unchanged', {});
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        alert('Save failed. You may not have permission to edit these fields.');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        clear: clear,
        reset: function () {
            var context = props$().context;
            clear();
            context.reset();
        },
        permalink: function () {
            var _a = props$(), context = _a.context, linkQuery = _a.linkQuery;
            window.open(context.permalink + "?" + jsonUrl_1.default.stringify(linkQuery));
        },
        download: function () {
            var _a = props$(), context = _a.context, query = _a.query, data = _a.data;
            download_1.default(context.config, context.types, query, data);
        },
    };
})
    .yield(function (_a) {
    var reset = _a.reset, download = _a.download, permalink = _a.permalink, save = _a.save, clear = _a.clear, isEditing = _a.isEditing, style = _a.style;
    return (React.createElement("div", { style: style.div },
        React.createElement(Link, { text: "Reset", onClick: reset, style: style.base }),
        React.createElement(Link, { text: "Download", onClick: download, style: style.base }),
        React.createElement(Link, { text: "Permalink", onClick: permalink, style: style.base }),
        isEditing && (React.createElement(React.Fragment, null,
            React.createElement(Button, { save: true, onClick: save, style: style.base }),
            React.createElement(Button, { onClick: clear, style: style.base })))));
});
