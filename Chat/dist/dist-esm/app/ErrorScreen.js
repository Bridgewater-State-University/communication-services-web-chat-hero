// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { DefaultButton, Stack, Text } from '@fluentui/react';
import { bottomStackFooterStyle, buttonStyle, buttonWithIconStyles, buttonsStackTokens, endChatContainerStyle, endChatTitleStyle, mainStackTokens, upperStackTokens } from './styles/EndChat.styles';
import React from 'react';
export const ErrorScreen = (props) => {
    const goHomePage = 'Go to homepage';
    return (React.createElement(Stack, { horizontal: true, wrap: true, horizontalAlign: "center", verticalAlign: "center", tokens: mainStackTokens, className: endChatContainerStyle },
        React.createElement(Stack, { tokens: upperStackTokens },
            React.createElement(Text, { role: 'heading', "aria-level": 1, className: endChatTitleStyle }, props.title),
            React.createElement(Stack, { horizontal: true, tokens: buttonsStackTokens },
                React.createElement(DefaultButton, { className: buttonStyle, styles: buttonWithIconStyles, text: goHomePage, onClick: props.homeHandler })),
            React.createElement("div", { className: bottomStackFooterStyle },
                React.createElement("a", { href: "https://github.com/Azure/Communication/issues" }, "Give Feedback"),
                "\u00A0on this sample app on Github"))));
};
//# sourceMappingURL=ErrorScreen.js.map