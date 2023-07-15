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
import { Icon, Image, Link, List, PrimaryButton, Spinner, Stack, Text, mergeStyles } from '@fluentui/react';
import React, { useCallback, useState } from 'react';
import { buttonStyle, buttonWithIconStyles, configContainerStackTokens, configContainerStyle, containerTokens, containerStyle, headerStyle, listIconStyle, listItemStackTokens, listItemStyle, imgStyle, listStyle, nestedStackTokens, infoContainerStyle, infoContainerStackTokens, videoCameraIconStyle } from './styles/HomeScreen.styles';
import { useTheme } from '@azure/communication-react';
import { Chat20Filled } from '@fluentui/react-icons';
import heroSVG from '../assets/hero.svg';
import heroDarkModeSVG from '../assets/hero_dark.svg';
import { getExistingThreadIdFromURL } from './utils/getParametersFromURL';
import { createThread } from './utils/createThread';
import { ThemeSelector } from './theming/ThemeSelector';
import { useSwitchableFluentTheme } from './theming/SwitchableFluentThemeProvider';
const imageStyleProps = {
    image: {
        height: '100%'
    },
    root: {}
};
const HOMESCREEN_SHOWING_START_CHAT_BUTTON = 1;
const HOMESCREEN_SHOWING_LOADING_SPINNER_CREATE_THREAD = 2;
/**
 * HomeScreen has two states:
 * 1. Showing start chat button
 * 2. Showing spinner after clicking start chat
 *
 * @param props
 */
export default () => {
    const spinnerLabel = 'Creating a new chat thread...';
    const iconName = 'SkypeCircleCheck';
    const headerTitle = 'Chat Support';
    const startChatButtonText = 'Start chat';
    const listItems = [
        'Live chat support from our department',
        'Professional assistance on duty',
        'It is possible to invite other participants',
        'How can we help you today?'
    ];
    const [homeScreenState, setHomeScreenState] = useState(HOMESCREEN_SHOWING_START_CHAT_BUTTON);
    const { currentTheme } = useSwitchableFluentTheme();
    const imageProps = { src: currentTheme.name === 'Light' ? heroSVG.toString() : heroDarkModeSVG.toString() };
    const onCreateThread = () => __awaiter(void 0, void 0, void 0, function* () {
        const exisitedThreadId = getExistingThreadIdFromURL();
        setHomeScreenState(HOMESCREEN_SHOWING_LOADING_SPINNER_CREATE_THREAD);
        if (exisitedThreadId && exisitedThreadId.length > 0) {
            window.location.href += `&threadId=${exisitedThreadId}`;
            return;
        }
        const threadId = yield createThread();
        if (!threadId) {
            console.error('Failed to create a thread, returned threadId is undefined or empty string');
            return;
        }
        else {
            window.location.href += `&threadId=${threadId}`;
        }
    });
    const displayLoadingSpinner = (spinnerLabel) => {
        return React.createElement(Spinner, { label: spinnerLabel, ariaLive: "assertive", labelPosition: "top" });
    };
    const themePrimary = useTheme().palette.themePrimary;
    const onRenderListItem = useCallback((item, index) => {
        const listText = index !== 4 ? (React.createElement(Text, null, item)) : (React.createElement(Text, null,
            item,
            ' ',
            React.createElement(Link, { href: "https://docs.microsoft.com/azure/communication-services/overview", "aria-label": `${item} sample` }, 'sample')));
        return (React.createElement(Stack, { horizontal: true, tokens: listItemStackTokens, className: listItemStyle },
            React.createElement(Icon, { className: mergeStyles(listIconStyle, { color: themePrimary }), iconName: iconName }),
            listText));
    }, [themePrimary]);
    const displayHomeScreen = () => {
        return (React.createElement(Stack, { horizontal: true, wrap: true, horizontalAlign: "center", verticalAlign: "center", tokens: containerTokens, className: containerStyle },
            React.createElement(Stack, { className: infoContainerStyle, tokens: infoContainerStackTokens },
                React.createElement(Text, { role: 'heading', "aria-level": 1, className: headerStyle }, headerTitle),
                React.createElement(Stack, { className: configContainerStyle, tokens: configContainerStackTokens },
                    React.createElement(Stack, { tokens: nestedStackTokens },
                        React.createElement(List, { className: listStyle, items: listItems, onRenderCell: onRenderListItem })),
                    React.createElement(PrimaryButton, { id: "startChat", "aria-label": "Start chat", text: startChatButtonText, className: buttonStyle, styles: buttonWithIconStyles, onClick: () => {
                            onCreateThread();
                        }, onRenderIcon: () => React.createElement(Chat20Filled, { className: videoCameraIconStyle }) }),
                    React.createElement(ThemeSelector, { label: "Theme", horizontal: true }))),
            React.createElement(Image, Object.assign({ styles: imageStyleProps, alt: "Welcome to the ACS Chat sample app", className: imgStyle }, imageProps))));
    };
    if (homeScreenState === HOMESCREEN_SHOWING_START_CHAT_BUTTON) {
        return displayHomeScreen();
    }
    else if (homeScreenState === HOMESCREEN_SHOWING_LOADING_SPINNER_CREATE_THREAD) {
        return displayLoadingSpinner(spinnerLabel);
    }
    else {
        throw new Error('home screen state ' + homeScreenState.toString() + ' is invalid');
    }
};
//# sourceMappingURL=HomeScreen.js.map