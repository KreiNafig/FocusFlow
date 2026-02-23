"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateNote = void 0;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _ButtonElem = require("../../../components/ui/ButtonElem");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var CreateNote = exports.CreateNote = function CreateNote() {
  var monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    title = _useState2[0],
    setTitle = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    text = _useState4[0],
    setText = _useState4[1];
  var navigate = (0, _reactRouterDom.useNavigate)();
  var date = new Date();
  function handleSubmit(e) {
    e.preventDefault();
    var data = {
      id: Date.now(),
      title: title,
      text: text,
      date: "".concat(date.getDate(), " ").concat(monthNames[date.getMonth()]),
      time: "".concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()),
      pin: false
    };
    var existingTasks = localStorage.getItem("notes");
    var tasks = existingTasks ? JSON.parse(existingTasks) : [];
    tasks.push(data);
    localStorage.setItem("notes", JSON.stringify(tasks));
    navigate('/notes');
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: "left",
      marginBottom: "20px"
    }
  }, "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u043A\u043B\u0430\u0434\u043A\u0438"), /*#__PURE__*/React.createElement("form", {
    className: "actions-note",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "headline"
  }, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"), /*#__PURE__*/React.createElement("input", {
    id: "headline",
    onChange: function onChange(e) {
      return setTitle(e.target.value);
    },
    placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"
  })), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "text-note"
  }, "\u0422\u0435\u043A\u0441\u0442"), /*#__PURE__*/React.createElement("textarea", {
    id: "text-note",
    onChange: function onChange(e) {
      return setText(e.target.value);
    },
    placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442"
  })), /*#__PURE__*/React.createElement(_ButtonElem.ButtonElem, {
    widthElem: "300px",
    heightElem: "60px",
    butColor: "white",
    color: "var(--aside)"
  }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0417\u0430\u043A\u043B\u0430\u0434\u043A\u0443")));
};