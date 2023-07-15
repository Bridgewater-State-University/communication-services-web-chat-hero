// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { setLogLevel } from '@azure/logger';
import { initializeIcons, Spinner } from '@fluentui/react';
import React, { useState } from 'react';
import { ChatScreen } from './ChatScreen';
import ConfigurationScreen from './ConfigurationScreen';
import { EndScreen } from './EndScreen';
import { ErrorScreen } from './ErrorScreen';
import HomeScreen from './HomeScreen';
import { getExistingThreadIdFromURL } from './utils/getParametersFromURL';
import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';
setLogLevel('warning');
initializeIcons();
initializeFileTypeIcons();
const ERROR_PAGE_TITLE_REMOVED = 'You have been removed from the chat.';
const webAppTitle = document.title;
export default () => {
    const [page, setPage] = useState('home');
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [threadId, setThreadId] = useState('');
    const [endpointUrl, setEndpointUrl] = useState('');
    const renderPage = () => {
        switch (page) {
            case 'home': {
                document.title = `home - ${webAppTitle}`;
                return React.createElement(HomeScreen, null);
            }
            case 'configuration': {
                document.title = `configuration - ${webAppTitle}`;
                return (React.createElement(ConfigurationScreen, { joinChatHandler: () => {
                        setPage('chat');
                    }, setToken: setToken, setUserId: setUserId, setDisplayName: setDisplayName, setThreadId: setThreadId, setEndpointUrl: setEndpointUrl }));
            }
            case 'chat': {
                document.title = `chat - ${webAppTitle}`;
                if (token && userId && displayName && threadId && endpointUrl) {
                    return (React.createElement(ChatScreen, { token: token, userId: userId, displayName: displayName, endpointUrl: endpointUrl, threadId: threadId, endChatHandler: (isParticipantRemoved) => {
                            if (isParticipantRemoved) {
                                setPage('removed');
                            }
                            else {
                                setPage('end');
                            }
                        } }));
                }
                return React.createElement(Spinner, { label: 'Loading...', ariaLive: "assertive", labelPosition: "top" });
            }
            case 'end': {
                document.title = `end chat - ${webAppTitle}`;
                return (React.createElement(EndScreen, { rejoinHandler: () => {
                        setPage('chat'); // use stored information to attempt to rejoin the chat thread
                    }, homeHandler: () => {
                        window.location.href = window.location.origin;
                    }, userId: userId, displayName: displayName }));
            }
            case 'removed': {
                document.title = `removed - ${webAppTitle}`;
                return (React.createElement(ErrorScreen, { title: ERROR_PAGE_TITLE_REMOVED, homeHandler: () => {
                        window.location.href = window.location.origin;
                    } }));
            }
            default:
                document.title = `error - ${webAppTitle}`;
                throw new Error('Page type not recognized');
        }
    };
    if (getExistingThreadIdFromURL() && page === 'home') {
        setPage('configuration');
    }
    return renderPage();
};
//# sourceMappingURL=App.js.map