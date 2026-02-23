"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateNote = void 0;
var _react = require("react");
var _reactRouterDom = require("react-router-dom");
var _ButtonElem = require("../../../components/ui/ButtonElem");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var UpdateNote = exports.UpdateNote = function UpdateNote() {
  var noteId = (0, _reactRouterDom.useParams)();
  var navigate = (0, _reactRouterDom.useNavigate)();
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    title = _useState2[0],
    setTitle = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    text = _useState4[0],
    setText = _useState4[1];
  (0, _react.useEffect)(function () {
    var notesStorage = localStorage.getItem("notes");
    var data = notesStorage ? JSON.parse(notesStorage) : [];
    if (notesStorage && noteId.id !== undefined) {
      var note = data.find(function (e) {
        return e.id === +noteId.id;
      });
      if (note) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(note.title);
        setText(note.text);
      }
    }
  }, [noteId.id]);
  function handleSubmit(e) {
    e.preventDefault();
    var notesStorage = localStorage.getItem("notes");
    var data = notesStorage ? JSON.parse(notesStorage) : [];
    var updatedNotes = data.map(function (note) {
      if (note.id === +noteId.id) {
        return _objectSpread(_objectSpread({}, note), {}, {
          title: title,
          text: text
        });
      }
      return note;
    });
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/notes");
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: "left",
      marginBottom: "20px"
    }
  }, "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043A\u043B\u0430\u0434\u043A\u0438"), /*#__PURE__*/React.createElement("form", {
    className: "actions-note",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "headline"
  }, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"), /*#__PURE__*/React.createElement("input", {
    onChange: function onChange(e) {
      return setTitle(e.target.value);
    },
    defaultValue: title,
    placeholder: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"
  })), /*#__PURE__*/React.createElement("article", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "text-note"
  }, "\u0422\u0435\u043A\u0441\u0442"), /*#__PURE__*/React.createElement("textarea", {
    id: "text-note",
    onChange: function onChange(e) {
      return setText(e.target.value);
    },
    defaultValue: text,
    placeholder: "\u0422\u0435\u043A\u0441\u0442"
  })), /*#__PURE__*/React.createElement(_ButtonElem.ButtonElem, {
    widthElem: "300px",
    heightElem: "60px",
    butColor: "white",
    color: "var(--aside)"
  }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")));
};