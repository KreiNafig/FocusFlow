"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Outlet = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Home = _interopRequireDefault(require("@mui/icons-material/Home"));
var _Task = _interopRequireDefault(require("@mui/icons-material/Task"));
var _Notes = _interopRequireDefault(require("@mui/icons-material/Notes"));
var _Person = _interopRequireDefault(require("@mui/icons-material/Person"));
var _Settings = _interopRequireDefault(require("@mui/icons-material/Settings"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Outlet = exports.Outlet = function Outlet() {
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    openBurger = _useState2[0],
    setOpenBurger = _useState2[1];
  var location = (0, _reactRouterDom.useLocation)();
  var path = location.pathname.split("/")[1];
  var arrayLink = [{
    name: "dashboard",
    icon: _Home.default
  }, {
    name: "tasks",
    icon: _Task.default
  }, {
    name: "notes",
    icon: _Notes.default
  }, {
    name: "profile",
    icon: _Person.default
  }, {
    name: "settings",
    icon: _Settings.default
  }];
  var currentLink = arrayLink.find(function (link) {
    return link.name === path;
  });
  var headerTitle = currentLink ? currentLink.name[0].toUpperCase() + currentLink.name.slice(1) : path;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react.default.createElement("aside", {
    className: "".concat(openBurger ? 'active' : '')
  }, /*#__PURE__*/_react.default.createElement("header", null, /*#__PURE__*/_react.default.createElement("h1", null, "Krein")), /*#__PURE__*/_react.default.createElement("section", null, arrayLink.map(function (e) {
    var IconComponent = e.icon;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "languette",
      key: e.name
    }, /*#__PURE__*/_react.default.createElement(IconComponent, null), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: "/".concat(e.name)
    }, e.name[0].toUpperCase() + e.name.slice(1)));
  }))), /*#__PURE__*/_react.default.createElement("div", {
    onClick: function onClick() {
      return setOpenBurger(!openBurger);
    },
    className: "burger ".concat(openBurger ? 'active' : '')
  }), /*#__PURE__*/_react.default.createElement("main", {
    className: "main"
  }, /*#__PURE__*/_react.default.createElement("header", {
    className: "header"
  }, /*#__PURE__*/_react.default.createElement("h1", null, headerTitle)), /*#__PURE__*/_react.default.createElement("article", {
    className: "article"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Outlet, null)))));
};