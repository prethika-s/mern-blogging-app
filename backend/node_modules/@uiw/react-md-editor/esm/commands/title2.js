import React from 'react';
import { titleExecute } from "../commands/title.js";
import { jsx as _jsx } from "react/jsx-runtime";
export var title2 = {
  name: 'title2',
  keyCommand: 'title2',
  shortcuts: 'ctrlcmd+2',
  prefix: '## ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title2 (ctrl + 2)',
    title: 'Insert title2 (ctrl + 2)'
  },
  icon: /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: 16,
      textAlign: 'left'
    },
    children: "Title 2"
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