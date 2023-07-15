// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from 'react';
import { DefaultButton, Icon, IconButton, mergeStyles, Stack } from '@fluentui/react';
import { buttonWithIconStyles, chatHeaderContainerStyle, greyIconButtonStyle, largeLeaveButtonContainerStyle, leaveButtonStyle, leaveIcon, leaveIconStyle, paneButtonContainerStyle, smallLeaveButtonContainerStyle } from './styles/ChatHeader.styles';
import { useTheme } from '@azure/communication-react';
export const ChatHeader = (props) => {
    const theme = useTheme();
    //const threadId = getExistingThreadIdFromURL();
    const shareURL = window.location.href + "&join=Yes";
    const shareLink = `<a href="${shareURL}">Share Link</a>`;
    const leaveString = 'Leave';
    return (React.createElement(Stack, { horizontal: true, verticalAlign: 'center', horizontalAlign: "end", className: chatHeaderContainerStyle, role: "banner" },
        React.createElement("div", { dangerouslySetInnerHTML: { __html: shareLink } }),
        React.createElement("div", { className: paneButtonContainerStyle }),
        React.createElement(DefaultButton, { className: mergeStyles(largeLeaveButtonContainerStyle, leaveButtonStyle, {
                color: theme.palette.neutralPrimaryAlt
            }), styles: buttonWithIconStyles, text: leaveString, onClick: () => props.onEndChat(), onRenderIcon: () => React.createElement(Icon, { iconName: leaveIcon.iconName, className: leaveIconStyle }), "aria-live": 'polite', "aria-label": leaveString }),
        React.createElement(IconButton, { iconProps: leaveIcon, className: mergeStyles(smallLeaveButtonContainerStyle, greyIconButtonStyle, {
                color: theme.palette.neutralPrimaryAlt
            }), onClick: () => props.onEndChat(), ariaLabel: leaveString, "aria-live": 'polite' })));
};
//# sourceMappingURL=ChatHeader.js.map