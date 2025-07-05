"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title5 = void 0;
var _react = _interopRequireDefault(require("react"));
var _title = require("../commands/title");
var _jsxRuntime = require("react/jsx-runtime");
var title5 = exports.title5 = {
  name: 'title5',
  keyCommand: 'title5',
  shortcuts: 'ctrlcmd+5',
  prefix: '##### ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title5 (ctrl + 5)',
    title: 'Insert title5 (ctrl + 5)'
  },
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      fontSize: 12,
      textAlign: 'left'
    },
    children: "Title 5"
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