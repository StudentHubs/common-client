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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var refluent_1 = require("refluent");
var set = require("lodash.set");
var keys_to_object_1 = require("keys-to-object");
var rgo_1 = require("rgo");
var common_1 = require("common");
var ejson_1 = require("../../ejson");
var utils_1 = require("../../utils");
var createStores_1 = require("./createStores");
var getState_1 = require("./getState");
var prepareFields_1 = require("./prepareFields");
function createForm(container, blockProps, block) {
    var _this = this;
    var Block = refluent_1.default
        .yield(utils_1.branch('fields', refluent_1.default
        .do(getState_1.default)
        .yield(function (_a) {
        var state = _a.state, next = _a.next;
        return (state ? next() : null);
    })
        .do('stores', 'fields', 'state', function (stores, fields, state) { return ({
        fields: fields.map(function (_a, i) {
            var key = _a.key, _ = _a.initial, f = __rest(_a, ["key", "initial"]);
            return (__assign({}, state[i], { onChange: function (value) {
                    return stores[key.store].set([
                        { key: key.key, value: common_1.transformValue(value, f.transform) },
                    ]);
                } }, f, { field: key }));
        }),
        stores: undefined,
        state: undefined,
    }); }), refluent_1.default.do(function () { return ({
        fields: undefined,
        stores: undefined,
        state: undefined,
    }); })))
        .yield(block);
    return refluent_1.default
        .yield(function (_a) {
        var next = _a.next;
        return next(function (props) { return props; }, true);
    })
        .yield(function (_a) {
        var next = _a.next;
        return next(function (_a) {
            var objects = _a.objects, blocks = _a.blocks, onCommit = _a.onCommit, onError = _a.onError, onSubmit = _a.onSubmit, props = __rest(_a, ["objects", "blocks", "onCommit", "onError", "onSubmit"]);
            return ({
                objects: objects,
                blocks: blocks,
                onCommit: onCommit,
                onError: onError,
                onSubmit: onSubmit,
                props: props,
            });
        });
    })
        .do(function (props$, push) {
        var stores = createStores_1.default();
        var count = 0;
        props$(function (props) { return ejson_1.default.stringify(props.objects); }, function (props) { return ejson_1.default.stringify(props.blocks); }, function (objectsJSON, blocksJSON) {
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                var index, info;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            index = ++count;
                            return [4 /*yield*/, prepareFields_1.default(blockProps, ejson_1.default.parse(objectsJSON), ejson_1.default.parse(blocksJSON), stores)];
                        case 1:
                            info = _a.sent();
                            if (index === count)
                                push(info);
                            return [2 /*return*/];
                    }
                });
            }); });
            return function () {
                return setTimeout(function () {
                    var _a;
                    (_a = common_1.root.rgo).set.apply(_a, __spread((props$().$fields || [])
                        .filter(function (f) { return f.key.store === 'rgo'; })
                        .map(function (f) { return ({ key: f.key.key }); })));
                });
            };
        });
        return {
            stores: stores,
            objects: undefined,
            blocks: undefined,
        };
    })
        .do(function (_, push) {
        var heightElem = null;
        return {
            height: null,
            setHeightElem: function (elem) { return (heightElem = elem); },
            lockHeight: function () {
                return push({ height: heightElem && heightElem.offsetHeight });
            },
        };
    })
        .yield(utils_1.branch('fields', refluent_1.default
        .do(function (_, push) {
        var mounted = true;
        push({
            processing: null,
            setProcessing: function (processing) { return mounted && push({ processing: processing }); },
        });
        return function () { return (mounted = false); };
    })
        .do(getState_1.default)
        .yield(utils_1.branch('state', refluent_1.default.do(function (props$, _) {
        var submit = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, e_1, _c, _d, onCommit, onSubmit, onError, stores, objects, fields, state, lockHeight, setProcessing, visibleFields, values, rgoKeys_1, extra_1, extraValues, changes_1, newIds, _e, _f, obj, _g, type, id, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _d = props$(), onCommit = _d.onCommit, onSubmit = _d.onSubmit, onError = _d.onError, stores = _d.stores, objects = _d.objects, fields = _d.fields, state = _d.state, lockHeight = _d.lockHeight, setProcessing = _d.setProcessing;
                        if (!!state.some(function (s) { return !s.hidden && s.invalid; })) return [3 /*break*/, 10];
                        lockHeight();
                        setProcessing(true);
                        visibleFields = fields.filter(function (_, i) { return !state[i].hidden; });
                        values = visibleFields.reduce(function (res, f, i) { return set(res, f.key.name, state[i].value); }, {});
                        rgoKeys_1 = visibleFields
                            .filter(function (f) { return f.key.store === 'rgo'; })
                            .map(function (f) { return f.key; });
                        if (!onCommit) return [3 /*break*/, 2];
                        return [4 /*yield*/, onCommit(values)];
                    case 1:
                        extra_1 = (_l.sent()) || {};
                        extraValues = Object.keys(extra_1).reduce(function (res, obj) { return __spread(res, Object.keys(extra_1[obj] || {}).map(function (field) { return ({
                            key: {
                                store: 'rgo',
                                key: [objects[obj].type, objects[obj].id, field],
                                name: obj + "." + field,
                            },
                            value: extra_1[obj][field],
                        }); })); }, []);
                        (_a = common_1.root.rgo).set.apply(_a, __spread(extraValues.map(function (_a) {
                            var key = _a.key, value = _a.value;
                            return ({
                                key: key.key,
                                value: value,
                            });
                        })));
                        rgoKeys_1.push.apply(rgoKeys_1, __spread(extraValues
                            .filter(function (_a) {
                            var key = _a.key;
                            return !rgoKeys_1.some(function (k) { return k.name === key.name; });
                        })
                            .map(function (_a) {
                            var key = _a.key;
                            return key;
                        })));
                        _l.label = 2;
                    case 2:
                        _l.trys.push([2, 6, , 9]);
                        return [4 /*yield*/, (_b = common_1.root.rgo).commit.apply(_b, __spread(rgoKeys_1.map(function (key) { return key.key; })))];
                    case 3:
                        newIds = _l.sent();
                        try {
                            for (_e = __values(Object.keys(objects)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                obj = _f.value;
                                _g = objects[obj], type = _g.type, id = _g.id;
                                values[obj].id = rgo_1.getId(id, newIds[type]);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        _h = onSubmit;
                        if (!_h) return [3 /*break*/, 5];
                        return [4 /*yield*/, onSubmit(values)];
                    case 4:
                        _h = (_l.sent());
                        _l.label = 5;
                    case 5:
                        changes_1 = _h;
                        return [3 /*break*/, 9];
                    case 6:
                        _j = _l.sent();
                        _k = onError;
                        if (!_k) return [3 /*break*/, 8];
                        return [4 /*yield*/, onError(values)];
                    case 7:
                        _k = (_l.sent());
                        _l.label = 8;
                    case 8:
                        changes_1 = _k;
                        return [3 /*break*/, 9];
                    case 9:
                        stores.rgo.set(Object.keys(changes_1 || {})
                            .filter(function (k) { return objects[k]; })
                            .reduce(function (res, k) { return __spread(res, Object.keys(changes_1[k]).map(function (field) { return ({
                            key: [objects[k].type, objects[k].id, field],
                            value: changes_1[k][field],
                        }); })); }, []));
                        stores.local.set(Object.keys(changes_1 || {})
                            .filter(function (k) { return !objects[k]; })
                            .reduce(function (res, k) { return __spread(res, [{ key: k, value: changes_1[k] }]); }, []));
                        setProcessing(changes_1 ? false : null);
                        return [3 /*break*/, 11];
                    case 10:
                        setProcessing(false);
                        _l.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        return {
            submit: submit,
            onKeyDown: function (event) { return event.which === 13 && submit(); },
        };
    })))))
        .yield(utils_1.branch(function (_a) {
        var fields = _a.fields, processing = _a.processing, state = _a.state;
        return !fields || processing || !state;
    }, function (_a) {
        var props = _a.props, height = _a.height;
        return React.createElement(container, __assign({ height: height }, props));
    }))
        .do('state', function (state) { return ({
        invalid: state.some(function (s) { return !s.hidden && s.invalid; }),
        hidden: JSON.stringify(state.map(function (s) { return s.hidden; })),
        state: undefined,
    }); })
        .yield(function (_a) {
        var next = _a.next;
        return next(function (props) { return props; });
    })
        .do('fields', 'hidden', function (fields, hidden) { return ({
        hidden: keys_to_object_1.default(JSON.parse(hidden), function (h) { return h; }, function (_, i) { return fields[i].key.name; }),
    }); })
        .yield(function (_a) {
        var blocks = _a.blocks, stores = _a.stores, props = _a.props, setHeightElem = _a.setHeightElem, processing = _a.processing, submit = _a.submit, onKeyDown = _a.onKeyDown, invalid = _a.invalid, hidden = _a.hidden;
        return React.createElement(container, __assign({ blocks: blocks
                .map(function (blockSet, i) {
                return blockSet.map(function (block, j) {
                    return (block.fields.length === 0 ||
                        block.fields.some(function (f) { return !hidden[f.key.name]; })) && (React.createElement(Block, __assign({}, block, { stores: stores, fields: block.fields.length === 0
                            ? null
                            : block.fields.filter(function (f) { return !hidden[f.key.name]; }), attempted: processing !== null, key: i + "_" + j })));
                });
            })
                .filter(function (blockComps) { return blockComps.some(function (c) { return c; }); }), setHeightElem: setHeightElem, attempted: processing !== null, submit: submit,
            onKeyDown: onKeyDown,
            invalid: invalid }, props));
    });
}
exports.default = createForm;
