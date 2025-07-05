import React from 'react';
import { titleExecute } from "../commands/title.js";
import { jsx as _jsx } from "react/jsx-runtime";
export var title3 = {
  name: 'title3',
  keyCommand: 'title3',
  shortcuts: 'ctrlcmd+3',
  prefix: '### ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title3 (ctrl + 3)',
    title: 'Insert title3 (ctrl + 3)'
  },
  icon: /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: 15,
      textAlign: 'left'
    },
    children: "Title 3"
  }),
  execute: (state, api) => {
    titleExecute({
      state,
      api,
      prefix: state.command.prefix,
      suffix: state.command.suffix
    });
  }
};