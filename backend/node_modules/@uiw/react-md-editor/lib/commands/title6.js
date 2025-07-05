"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title6 = void 0;
var _react = _interopRequireDefault(require("react"));
var _title = require("../commands/title");
var _jsxRuntime = require("react/jsx-runtime");
var title6 = exports.title6 = {
  name: 'title6',
  keyCommand: 'title6',
  shortcuts: 'ctrlcmd+6',
  prefix: '###### ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title6 (ctrl + 6)',
    title: 'Insert title6 (ctrl + 6)'
  },
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      fontSize: 12,
      textAlign: 'left'
    },
    children: "Title 6"
  }),
  execute: function execute(state, api) {
    (0, _title.titleExecute)({
      state: state,
      api: api,
      prefix: state.command.prefix,
      suffix: state.command.suffix
    });
  }
};