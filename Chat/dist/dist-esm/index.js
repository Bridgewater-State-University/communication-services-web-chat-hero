// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import { SwitchableFluentThemeProvider } from './app/theming/SwitchableFluentThemeProvider';
const domNode = document.getElementById('root');
if (!domNode) {
    throw new Error('Failed to find the root element');
}
createRoot(domNode).render(React.createElement(SwitchableFluentThemeProvider, { scopeId: "SampleChatApp" },
    React.createElement("div", { className: "wrapper" },
        React.createElement(App, null))));
//# sourceMappingURL=index.js.map