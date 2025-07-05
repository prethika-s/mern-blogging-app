"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title1 = void 0;
var _react = _interopRequireDefault(require("react"));
var _title = require("../commands/title");
var _jsxRuntime = require("react/jsx-runtime");
var title1 = exports.title1 = {
  name: 'title1',
  keyCommand: 'title1',
  shortcuts: 'ctrlcmd+1',
  prefix: '# ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title1 (ctrl + 1)',
    title: 'Insert title1 (ctrl + 1)'
  },
  icon: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      fontSize: 18,
      textAlign: 'left'
    },
    children: "Title 1"
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