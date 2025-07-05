"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title2 = void 0;
var _react = _interopRequireDefault(require("react"));
var _title = require("../commands/title");
var _jsxRuntime = require("react/jsx-runtime");
var title2 = exports.title2 = {
  name: 'title2',
  keyCommand: 'title2',
  shortcuts: 'ctrlcmd+2',
  prefix: '## ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title2 (ctrl + 2)',
    title: 'Insert title2 (ctrl + 2)'
  },
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      fontSize: 16,
      textAlign: 'left'
    },
    children: "Title 2"
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