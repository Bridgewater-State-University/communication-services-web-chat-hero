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
import { CAT, FOX, KOALA, MONKEY, MOUSE, OCTOPUS } from './utils/utils';
import { useTheme } from '@azure/communication-react';
import { FocusZone, FocusZoneDirection, PrimaryButton, Spinner, Stack, Text } from '@fluentui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { buttonStyle, buttonWithIconStyles, chatIconStyle, mainContainerStyle } from './styles/ConfigurationScreen.styles';
import { avatarListContainerStackTokens, avatarListContainerStyle, headerStyle, labelFontStyle, largeAvatarContainerStyle, largeAvatarStyle, leftPreviewContainerStackTokens, leftPreviewContainerStyle, namePreviewStyle, responsiveLayoutStackTokens, responsiveLayoutStyle, rightInputContainerStackTokens, rightInputContainerStyle, smallAvatarContainerStyle, smallAvatarStyle } from './styles/ConfigurationScreen.styles';
import { Chat20Filled } from '@fluentui/react-icons';
import { DisplayNameField } from './DisplayNameField';
import { sendEmojiRequest } from './utils/setEmoji';
import { getToken } from './utils/getToken';
import { getExistingDisplayNameFromURL, getExistingEndpointURLFromURL, getExistingThreadIdFromURL, getExistingTokenFromURL, getExistingUserIdFromURL } from './utils/getParametersFromURL';
import { joinThread, autoPostThread } from './utils/joinThread';
import { getEndpointUrl } from './utils/getEndpointUrl';
import { sendEmail } from './utils/sendEmail';
// ConfigurationScreen states
const CONFIGURATIONSCREEN_SHOWING_SPINNER_LOADING = 1;
const CONFIGURATIONSCREEN_SHOWING_JOIN_CHAT = 2;
const CONFIGURATIONSCREEN_SHOWING_INVALID_THREAD = 3;
const CONFIGURATIONSCREEN_SHOWING_SPINNER_INITIALIZE_CHAT = 4;
const AVATAR_LABEL = 'Avatar';
const ERROR_TEXT_THREAD_INVALID = 'Thread Id is not valid, please revisit home page to create a new thread';
const ERROR_TEXT_THREAD_NOT_RECORDED = 'Thread id is not recorded in server';
const ERROR_TEXT_THREAD_NULL = 'Thread id is null';
const INITIALIZE_CHAT_SPINNER_LABEL = 'Initializing chat client...';
const JOIN_BUTTON_TEXT = 'Join chat';
const LOADING_SPINNER_LABEL = 'Loading...';
const NAME_DEFAULT = 'Name';
const PROFILE_LABEL = 'Your profile';
/**
 * There are four states of ConfigurationScreen.
 * 1. Loading configuration screen state. This will show 'loading' spinner on the screen.
 * 2. Join chat screen. This will show a name selector.
 * 3. Invalid thread state. This will show 'thread id is not valid' on the screen.
 * 4. Loading chat spinner. This will show 'initializing chat client' spinner on the screen.
 *
 * @param props
 */
export default (props) => {
    const avatarsList = [CAT, MOUSE, KOALA, OCTOPUS, MONKEY, FOX];
    const [name, setName] = useState('');
    const [emptyWarning, setEmptyWarning] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(CAT);
    const [configurationScreenState, setConfigurationScreenState] = useState(CONFIGURATIONSCREEN_SHOWING_SPINNER_LOADING);
    const [disableJoinChatButton, setDisableJoinChatButton] = useState(false);
    const theme = useTheme();
    const { joinChatHandler, setToken, setUserId, setDisplayName, setThreadId, setEndpointUrl } = props;
    // Used when new user is being registered.
    const setupAndJoinChatThreadWithNewUser = useCallback(() => {
        const internalSetupAndJoinChatThread = () => __awaiter(void 0, void 0, void 0, function* () {
            const threadId = getExistingThreadIdFromURL();
            const token = yield getToken();
            const endpointUrl = yield getEndpointUrl();
            if (!threadId) {
                throw new Error(ERROR_TEXT_THREAD_NULL);
            }
            setToken(token.token);
            setUserId(token.identity);
            setDisplayName(name);
            setThreadId(threadId);
            setEndpointUrl(endpointUrl);
            yield sendEmojiRequest(token.identity, selectedAvatar);
            const result = yield joinThread(threadId, token.identity, name);
            if (!result) {
                setConfigurationScreenState(CONFIGURATIONSCREEN_SHOWING_INVALID_THREAD);
                setDisableJoinChatButton(false);
                return;
            }
            setDisableJoinChatButton(false);
            joinChatHandler();
            // ** START ** - Add admin user
            const urlParams = new URLSearchParams(window.location.search);
            const adminUser = urlParams.get('adminUser') || '';
            const joinUser = urlParams.get('join') || 'No';
            const emailSubject = `Support Chat Request: ${name}`;
            const shareURL = window.location.href + '&join=Yes';
            const shareLink = `<a href="${shareURL}">Share Link</a>`;
            if (adminUser != '' && joinUser == 'No') {
                yield new Promise(f => setTimeout(f, 1000));
                autoPostThread(threadId, 'Initial'); // Auto post a message urging to user to be patient as admin joins thread
                const emailResponse = yield sendEmail(adminUser, emailSubject, shareLink);
                if (emailResponse == 'Success') {
                    console.log('A notification has been sent to the chat attendant.');
                    autoPostThread(threadId, 'Notification');
                }
                else {
                    console.log('Error sending email notification to chat attendant.');
                }
            }
            // ** END ** - Add admin user
        });
        internalSetupAndJoinChatThread();
    }, [name, joinChatHandler, selectedAvatar, setDisplayName, setEndpointUrl, setThreadId, setToken, setUserId]);
    const joinChatThreadWithExistingUser = useCallback((token, userId, displayName, threadId, endpointUrl) => {
        setToken(token);
        setUserId(userId);
        setDisplayName(displayName);
        setThreadId(threadId);
        setEndpointUrl(endpointUrl);
        setEmptyWarning(false);
        setConfigurationScreenState(CONFIGURATIONSCREEN_SHOWING_SPINNER_INITIALIZE_CHAT);
        joinChatHandler();
    }, [joinChatHandler, setDisplayName, setEndpointUrl, setThreadId, setToken, setUserId]);
    useEffect(() => {
        if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_SPINNER_LOADING) {
            const setScreenState = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const threadId = getExistingThreadIdFromURL();
                    if (!threadId) {
                        throw new Error(ERROR_TEXT_THREAD_NOT_RECORDED);
                    }
                }
                catch (error) {
                    setConfigurationScreenState(CONFIGURATIONSCREEN_SHOWING_INVALID_THREAD);
                    return;
                }
                // Check if we have all the required parameters supplied as query search params.
                const threadId = getExistingThreadIdFromURL();
                const token = getExistingTokenFromURL();
                const userId = getExistingUserIdFromURL();
                const displayName = getExistingDisplayNameFromURL();
                const endpointUrl = getExistingEndpointURLFromURL();
                if (token && userId && displayName && threadId && endpointUrl) {
                    joinChatThreadWithExistingUser(token, userId, displayName, threadId, endpointUrl);
                    return;
                }
                // Else show the join chat screen where a user enters there display name and the other args are collected from the server
                setConfigurationScreenState(CONFIGURATIONSCREEN_SHOWING_JOIN_CHAT);
            });
            setScreenState();
        }
    }, [configurationScreenState, joinChatThreadWithExistingUser]);
    const smallAvatarContainerClassName = useCallback((avatar) => {
        return smallAvatarContainerStyle(avatar, selectedAvatar, theme);
    }, [selectedAvatar, theme]);
    const validateName = () => {
        if (!name) {
            setEmptyWarning(true);
        }
        else {
            setEmptyWarning(false);
            setDisableJoinChatButton(true);
            setConfigurationScreenState(CONFIGURATIONSCREEN_SHOWING_SPINNER_INITIALIZE_CHAT);
            setupAndJoinChatThreadWithNewUser();
        }
    };
    const onAvatarChange = (newAvatar) => {
        setSelectedAvatar(newAvatar);
    };
    const displaySpinner = (spinnerLabel) => {
        return React.createElement(Spinner, { label: spinnerLabel, ariaLive: "assertive", labelPosition: "top" });
    };
    const displayJoinChatArea = () => {
        return (React.createElement(Stack, { horizontal: true, wrap: true, horizontalAlign: "center", verticalAlign: "center", tokens: responsiveLayoutStackTokens, className: responsiveLayoutStyle },
            React.createElement(Stack, { horizontalAlign: "center", tokens: leftPreviewContainerStackTokens, className: leftPreviewContainerStyle },
                React.createElement(Text, { role: 'heading', "aria-level": 1, className: headerStyle }, PROFILE_LABEL),
                React.createElement("div", { className: largeAvatarContainerStyle(selectedAvatar) },
                    React.createElement("div", { "aria-label": `${selectedAvatar} avatar selected`, "aria-live": "polite", className: largeAvatarStyle },
                        React.createElement("div", { "aria-hidden": "true" }, selectedAvatar))),
                React.createElement(Text, { className: namePreviewStyle(name !== '') }, name !== '' ? name : NAME_DEFAULT)),
            React.createElement(Stack, { className: rightInputContainerStyle, tokens: rightInputContainerStackTokens },
                React.createElement(Text, { id: 'avatar-list-label', className: labelFontStyle }, AVATAR_LABEL),
                React.createElement(FocusZone, { direction: FocusZoneDirection.horizontal },
                    React.createElement(Stack, { horizontal: true, className: avatarListContainerStyle, tokens: avatarListContainerStackTokens, role: "list", "aria-labelledby": 'avatar-list-label' }, avatarsList.map((avatar, index) => (React.createElement("div", { role: "listitem", id: avatar, key: index, "data-is-focusable": true, className: smallAvatarContainerClassName(avatar), onClick: () => onAvatarChange(avatar) },
                        React.createElement("div", { className: smallAvatarStyle }, avatar)))))),
                React.createElement(DisplayNameField, { setName: setName, setEmptyWarning: setEmptyWarning, validateName: validateName, isEmpty: emptyWarning }),
                React.createElement(PrimaryButton, { disabled: disableJoinChatButton, className: buttonStyle, styles: buttonWithIconStyles, text: JOIN_BUTTON_TEXT, onClick: validateName, onRenderIcon: () => React.createElement(Chat20Filled, { className: chatIconStyle }) }))));
    };
    const displayInvalidThreadError = () => {
        return (React.createElement("div", null,
            React.createElement("p", null, ERROR_TEXT_THREAD_INVALID)));
    };
    const displayWithStack = (child) => {
        return (React.createElement(Stack, { className: mainContainerStyle, horizontalAlign: "center", verticalAlign: "center" }, child));
    };
    if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_SPINNER_LOADING) {
        return displaySpinner(LOADING_SPINNER_LABEL);
    }
    else if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_JOIN_CHAT) {
        return displayWithStack(displayJoinChatArea());
    }
    else if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_INVALID_THREAD) {
        return displayWithStack(displayInvalidThreadError());
    }
    else if (configurationScreenState === CONFIGURATIONSCREEN_SHOWING_SPINNER_INITIALIZE_CHAT) {
        return displaySpinner(INITIALIZE_CHAT_SPINNER_LABEL);
    }
    else {
        throw new Error('configuration screen state ' + configurationScreenState.toString() + ' is invalid');
    }
};
//# sourceMappingURL=ConfigurationScreen.js.map