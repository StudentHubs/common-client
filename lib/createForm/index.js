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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var recompose_1 = require("recompose");
var mishmash_1 = require("mishmash");
var most = require("most");
var _ = require("lodash");
var keys_to_object_1 = require("keys-to-object");
var common_1 = require("common");
var getState_1 = require("./getState");
var prepareFields_1 = require("./prepareFields");
function createForm(container, block) {
    var _this = this;
    var Block = recompose_1.branch(function (_a) {
        var fields = _a.fields;
        return fields;
    }, recompose_1.compose(getState_1.default, recompose_1.branch(function (_a) {
        var state = _a.state;
        return !state;
    }, recompose_1.renderNothing), recompose_1.mapProps(function (_a) {
        var stores = _a.stores, fields = _a.fields, state = _a.state, props = __rest(_a, ["stores", "fields", "state"]);
        return (__assign({}, props, { fields: fields.map(function (_a, i) {
                var key = _a.key, _ = _a.initial, f = __rest(_a, ["key", "initial"]);
                return (__assign({}, state[i], { onChange: function (value) {
                        return stores[key.store].set([
                            { key: key.key, value: common_1.transformValue(value, f.transform) },
                        ]);
                    } }, f, { field: key }));
            }) }));
    })), mishmash_1.omitProps('fields', 'stores', 'state'))(Array.isArray(block) ? block[1] : block);
    return recompose_1.compose(mishmash_1.memoizeProps('objects', 'blocks'), recompose_1.pure, mishmash_1.mapPropsStream(function (props$) {
        var state = {};
        var listeners = [];
        var stores = {
            rgo: {
                get: function (keys, emit) {
                    var queries = {};
                    keys.forEach(function (_a) {
                        var _b = __read(_a, 3), type = _b[0], id = _b[1], field = _b[2];
                        var key = type + "." + id;
                        queries[key] = queries[key] || {};
                        queries[key][field] = true;
                    });
                    var queryKeys = Object.keys(queries);
                    return (_a = window.rgo).query.apply(_a, __spread(queryKeys.map(function (key, i) { return ({
                        name: key.split('.')[0],
                        alias: "obj" + i,
                        filter: key.split('.')[1],
                        fields: Object.keys(queries[key]),
                    }); }), [function (data) {
                            return emit(data &&
                                keys.map(function (_a) {
                                    var _b = __read(_a, 3), type = _b[0], id = _b[1], field = _b[2];
                                    var record = data["obj" + queryKeys.indexOf(type + "." + id)][0];
                                    return common_1.noUndef(record && record[field]);
                                }));
                        }]));
                    var _a;
                },
                set: function (values) {
                    (_a = window.rgo).set.apply(_a, __spread(values));
                    var _a;
                },
            },
            local: {
                get: function (keys, emit) {
                    emit(keys.map(function (key) { return common_1.noUndef(state[key]); }));
                    if (keys.length > 0) {
                        var listener_1 = { keys: keys, emit: emit };
                        listeners.push(listener_1);
                        return function () { return listeners.splice(listeners.indexOf(listener_1), 1); };
                    }
                    return function () { };
                },
                set: function (values) {
                    values.forEach(function (_a) {
                        var key = _a.key, value = _a.value;
                        return (state[key] = value);
                    });
                    listeners.forEach(function (l) {
                        if (values.some(function (_a) {
                            var key = _a.key;
                            return l.keys.includes(key);
                        })) {
                            l.emit(l.keys.map(function (key) { return common_1.noUndef(state[key]); }));
                        }
                    });
                },
            },
        };
        return props$.map(function (props) { return (__assign({ stores: stores }, props)); });
    }), mishmash_1.mapPropsStream(function (props$) {
        var fields;
        props$.observe(function () { }).then(function () {
            (_a = window.rgo).set.apply(_a, __spread(fields
                .filter(function (f) { return f.key.store === 'rgo'; })
                .map(function (f) { return ({ key: f.key.key }); })));
            var _a;
        });
        return props$
            .map(function (_a) {
            var objects = _a.objects, blocks = _a.blocks, stores = _a.stores, onCommit = _a.onCommit, onError = _a.onError, onSubmit = _a.onSubmit, props = __rest(_a, ["objects", "blocks", "stores", "onCommit", "onError", "onSubmit"]);
            return most
                .fromPromise(prepareFields_1.default(Array.isArray(block) ? block[0] : [], objects, blocks, stores))
                .tap(function (newProps) { return (fields = newProps.fields); })
                .startWith({})
                .map(function (newProps) { return (__assign({ stores: stores,
                onCommit: onCommit,
                onError: onError,
                onSubmit: onSubmit,
                props: props }, newProps)); });
        })
            .switchLatest();
    }), recompose_1.withState('elem', 'setElem', null), recompose_1.withHandlers({
        HeightWrap: function (_a) {
            var setElem = _a.setElem;
            return function (_a) {
                var children = _a.children;
                return (React.createElement("div", { ref: setElem }, children));
            };
        },
    }), recompose_1.withState('height', 'setHeight', null), recompose_1.branch(function (_a) {
        var fields = _a.fields;
        return fields;
    }, recompose_1.compose(mishmash_1.mapPropsStream(function (props$) {
        var _a = recompose_1.createEventHandler(), processing$ = _a.stream, setProcessing = _a.handler;
        return props$.combine(function (props, processing) { return (__assign({}, props, { processing: processing,
            setProcessing: setProcessing })); }, most.from(processing$).startWith(null));
    }), getState_1.default, recompose_1.branch(function (_a) {
        var state = _a.state;
        return state;
    }, recompose_1.compose(recompose_1.withHandlers({
        submit: function (_a) {
            var onCommit = _a.onCommit, onSubmit = _a.onSubmit, onError = _a.onError, stores = _a.stores, objects = _a.objects, fields = _a.fields, elem = _a.elem, setHeight = _a.setHeight, setProcessing = _a.setProcessing, state = _a.state;
            return function () { return __awaiter(_this, void 0, void 0, function () {
                var visibleFields, values_1, rgoKeys_1, extra_1, extraValues, result_1, _a, _b, obj, _c, type, id, changes_1, _d, _e, _f, _g, _h, e_1, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            if (!!state.some(function (s) { return !s.hidden && s.invalid; })) return [3 /*break*/, 10];
                            if (elem)
                                setHeight(elem.offsetHeight);
                            setProcessing(true);
                            visibleFields = fields.filter(function (_, i) { return !state[i].hidden; });
                            values_1 = visibleFields.reduce(function (res, f, i) { return _.set(res, f.key.name, state[i].value); }, {});
                            rgoKeys_1 = visibleFields
                                .filter(function (f) { return f.key.store === 'rgo'; })
                                .map(function (f) { return f.key; });
                            if (!onCommit) return [3 /*break*/, 2];
                            return [4 /*yield*/, onCommit(values_1)];
                        case 1:
                            extra_1 = (_k.sent()) || {};
                            extraValues = Object.keys(extra_1).reduce(function (res, obj) { return __spread(res, Object.keys(extra_1[obj] || {}).map(function (field) { return ({
                                key: {
                                    store: 'rgo',
                                    key: [
                                        objects[obj].type,
                                        objects[obj].id,
                                        field,
                                    ],
                                    name: obj + "." + field,
                                },
                                value: extra_1[obj][field],
                            }); })); }, []);
                            (_g = window.rgo).set.apply(_g, __spread(extraValues.map(function (_a) {
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
                            _k.label = 2;
                        case 2: return [4 /*yield*/, (_h = window.rgo).commit.apply(_h, __spread(rgoKeys_1.map(function (key) { return key.key; })))];
                        case 3:
                            result_1 = _k.sent();
                            if (result_1) {
                                if (result_1.values) {
                                    rgoKeys_1.forEach(function (key, i) {
                                        _.set(values_1, key.name, result_1.values[i]);
                                    });
                                }
                                if (result_1.newIds) {
                                    try {
                                        for (_a = __values(Object.keys(objects)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                            obj = _b.value;
                                            _c = objects[obj], type = _c.type, id = _c.id;
                                            values_1[obj].id =
                                                (result_1.newIds[type] && result_1.newIds[type][id]) ||
                                                    id;
                                        }
                                    }
                                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                    finally {
                                        try {
                                            if (_b && !_b.done && (_j = _a.return)) _j.call(_a);
                                        }
                                        finally { if (e_1) throw e_1.error; }
                                    }
                                }
                            }
                            if (!result_1) return [3 /*break*/, 6];
                            _e = onSubmit;
                            if (!_e) return [3 /*break*/, 5];
                            return [4 /*yield*/, onSubmit(values_1)];
                        case 4:
                            _e = (_k.sent());
                            _k.label = 5;
                        case 5:
                            _d = _e;
                            return [3 /*break*/, 9];
                        case 6:
                            _f = onError;
                            if (!_f) return [3 /*break*/, 8];
                            return [4 /*yield*/, onError(values_1)];
                        case 7:
                            _f = (_k.sent());
                            _k.label = 8;
                        case 8:
                            _d = _f;
                            _k.label = 9;
                        case 9:
                            changes_1 = _d;
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
                            _k.label = 11;
                        case 11: return [2 /*return*/];
                    }
                });
            }); };
        },
    }), recompose_1.withHandlers({
        onKeyDown: function (_a) {
            var submit = _a.submit;
            return function (event) {
                if (event.which === 13)
                    submit();
            };
        },
    }))))), recompose_1.branch(function (_a) {
        var fields = _a.fields, processing = _a.processing, state = _a.state;
        return !fields || processing || !state;
    }, recompose_1.renderComponent(function (_a) {
        var props = _a.props, height = _a.height;
        return React.createElement(container, __assign({ HeightWrap: function (_a) {
                var style = _a.style, children = _a.children;
                return (React.createElement("div", { style: __assign({ position: 'relative' }, style, { height: height || style.height || 'auto' }) }, children));
            } }, props));
    })), recompose_1.mapProps(function (_a) {
        var fields = _a.fields, state = _a.state, props = __rest(_a, ["fields", "state"]);
        return (__assign({ invalid: state.some(function (s) { return !s.hidden && s.invalid; }), hidden: JSON.stringify(keys_to_object_1.default(fields, function (_, i) { return state[i].hidden; }, function (f) { return f.key.name; })) }, props));
    }), recompose_1.pure, recompose_1.withProps(function (props) { return ({ hidden: JSON.parse(props.hidden) }); }))(function (_a) {
        var blocks = _a.blocks, stores = _a.stores, props = _a.props, HeightWrap = _a.HeightWrap, processing = _a.processing, submit = _a.submit, onKeyDown = _a.onKeyDown, invalid = _a.invalid, hidden = _a.hidden;
        return React.createElement(container, __assign({ blocks: blocks
                .map(function (blockSet, i) {
                return blockSet
                    .filter(function (_a) {
                    var fields = _a.fields;
                    return fields.length === 0 || fields.some(function (f) { return !hidden[f.key.name]; });
                })
                    .map(function (block, j) { return (React.createElement(Block, __assign({}, block, { stores: stores, fields: block.fields.length === 0
                        ? null
                        : block.fields.filter(function (f) { return !hidden[f.key.name]; }), attempted: processing !== null, key: i + "_" + j }))); });
            })
                .filter(function (blockSet) { return blockSet.length > 0; }), HeightWrap: HeightWrap, attempted: processing !== null, submit: submit,
            onKeyDown: onKeyDown,
            invalid: invalid }, props));
    });
}
exports.default = createForm;