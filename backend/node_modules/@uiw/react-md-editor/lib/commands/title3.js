"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title3 = void 0;
var _react = _interopRequireDefault(require("react"));
var _title = require("../commands/title");
var _jsxRuntime = require("react/jsx-runtime");
var title3 = exports.title3 = {
  name: 'title3',
  keyCommand: 'title3',
  shortcuts: 'ctrlcmd+3',
  prefix: '### ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title3 (ctrl + 3)',
    title: 'Insert title3 (ctrl + 3)'
  },
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      fontSize: 15,
      textAlign: 'left'
    },
    children: "Title 3"
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