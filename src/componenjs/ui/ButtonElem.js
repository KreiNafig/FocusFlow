"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonElem = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var ButtonElem = exports.ButtonElem = function ButtonElem(_ref) {
  var color = _ref.color,
    padding = _ref.padding,
    butColor = _ref.butColor,
    widthElem = _ref.widthElem,
    heightElem = _ref.heightElem,
    children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    className: "button-element",
    style: {
      backgroundColor: "".concat(color),
      padding: "".concat(padding),
      color: "".concat(butColor),
      width: "".concat(widthElem),
      height: "".concat(heightElem)
    }
  }, children));
};