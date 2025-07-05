import React from 'react';
import { titleExecute } from "../commands/title.js";
import { jsx as _jsx } from "react/jsx-runtime";
export var title4 = {
  name: 'title4',
  keyCommand: 'title4',
  shortcuts: 'ctrlcmd+4',
  prefix: '#### ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title4 (ctrl + 4)',
    title: 'Insert title4 (ctrl + 4)'
  },
  icon: /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: 14,
      textAlign: 'left'
    },
    children: "Title 4"
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