import React from 'react';
import { titleExecute } from "../commands/title.js";
import { jsx as _jsx } from "react/jsx-runtime";
export var title5 = {
  name: 'title5',
  keyCommand: 'title5',
  shortcuts: 'ctrlcmd+5',
  prefix: '##### ',
  suffix: '',
  buttonProps: {
    'aria-label': 'Insert title5 (ctrl + 5)',
    title: 'Insert title5 (ctrl + 5)'
  },
  icon: /*#__PURE__*/_jsx("div", {
    style: {
      fontSize: 12,
      textAlign: 'left'
    },
    children: "Title 5"
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