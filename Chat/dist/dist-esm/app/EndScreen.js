// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DefaultButton, PrimaryButton, Stack, Link, Text } from '@fluentui/react';
import React, { useCallback, useState } from 'react';
import { bottomStackFooterStyle, buttonStyle, buttonWithIconStyles, buttonsStackTokens, chatIconStyle, endChatContainerStyle, endChatTitleStyle, mainStackTokens, upperStackTokens } from './styles/EndChat.styles';
import { Chat20Filled } from '@fluentui/react-icons';
import { getExistingThreadIdFromURL } from './utils/getParametersFromURL';
import { joinThread } from './utils/joinThread';
export const EndScreen = (props) => {
    const leftCall = 'You left the chat';
    const goHomePage = 'Go to homepage';
    const rejoinChat = 'Rejoin chat';
    const rejoining = 'Rejoining...';
    const [isRejoiningThread, setIsRejoiningThread] = useState(false);
    const { rejoinHandler, userId, displayName } = props;
    const rejoinThread = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!isRejoiningThread) {
            const threadId = getExistingThreadIdFromURL();
            if (!threadId) {
                console.error('thread id is null');
                return;
            }
            // potential issue where someone changes the threadId in the url to something the adminUserId is not already in.
            // this will throw an exception on the server and we will fail to rejoin the chat thread
            const didJoin = yield joinThread(threadId, userId, displayName);
            if (!didJoin) {
                console.error('invalid thread. unable to add the user to this thread');
                return;
            }
            setIsRejoiningThread(true);
            rejoinHandler();
        }
    }), [isRejoiningThread, displayName, userId, rejoinHandler]);
    const feedbackLink = 'https://studentbridgew.sharepoint.com/Lists/Feedback/NewForm.aspx?Source=https%3A%2F%2Fstudentbridgew%2Esharepoint%2Ecom%2FSitePages%2FThank%2DYou%2Dfor%2Dyour%2DFeedback%2Easpx&RootFolder=%2FLists%2FFeedback';
    return (React.createElement(Stack, { horizontal: true, wrap: true, horizontalAlign: "center", verticalAlign: "center", tokens: mainStackTokens, className: endChatContainerStyle },
        React.createElement(Stack, { tokens: upperStackTokens },
            React.createElement(Text, { role: 'heading', "aria-level": 1, "aria-label": leftCall, "aria-live": 'polite', className: endChatTitleStyle }, leftCall),
            React.createElement(Stack, { horizontal: true, wrap: true, tokens: buttonsStackTokens },
                React.createElement(PrimaryButton, { disabled: isRejoiningThread, className: buttonStyle, styles: buttonWithIconStyles, text: isRejoiningThread ? rejoining : rejoinChat, onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                        yield rejoinThread();
                    }), onRenderIcon: () => React.createElement(Chat20Filled, { className: chatIconStyle }) }),
                React.createElement(DefaultButton, { className: buttonStyle, styles: buttonWithIconStyles, text: goHomePage, onClick: props.homeHandler })),
            React.createElement("div", { className: bottomStackFooterStyle },
                React.createElement(Link, { href: feedbackLink }, "Give Feedback"),
                "\u00A0on this Support Chat app."))));
};
//# sourceMappingURL=EndScreen.js.map