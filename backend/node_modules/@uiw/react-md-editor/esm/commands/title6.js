import React from 'react';
import { titleExecute } from "../commands/title.js";
import { jsx as _jsx } from "react/jsx-runtime";
export var title6 = {
  name: 'title6',
  keyCommand: 'title6',
  shortcuts: 'ctrlcmd+6',
  prefix: '###### ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title6 (ctrl + 6)',
    title: 'Insert title6 (ctrl + 6)'
  },
  icon: /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: 12,
      textAlign: 'left'
    },
    children: "Title 6"
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