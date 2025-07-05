"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title4 = void 0;
var _react = _interopRequireDefault(require("react"));
var _title = require("../commands/title");
var _jsxRuntime = require("react/jsx-runtime");
var title4 = exports.title4 = {
  name: 'title4',
  keyCommand: 'title4',
  shortcuts: 'ctrlcmd+4',
  prefix: '#### ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title4 (ctrl + 4)',
    title: 'Insert title4 (ctrl + 4)'
  },
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      fontSize: 14,
      textAlign: 'left'
    },
    children: "Title 4"
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