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
import { ChatComposite, fromFlatCommunicationIdentifier, toFlatCommunicationIdentifier, useAzureCommunicationChatAdapter } from '@azure/communication-react';
import { Stack } from '@fluentui/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ChatHeader } from './ChatHeader';
import { chatCompositeContainerStyle, chatScreenContainerStyle } from './styles/ChatScreen.styles';
import { createAutoRefreshingCredential } from './utils/credential';
import { fetchEmojiForUser } from './utils/emojiCache';
import { getBackgroundColor } from './utils/utils';
import { useSwitchableFluentTheme } from './theming/SwitchableFluentThemeProvider';
export const ChatScreen = (props) => {
    const { displayName, endpointUrl, threadId, token, userId, endChatHandler } = props;
    // Disables pull down to refresh. Prevents accidental page refresh when scrolling through chat messages
    // Another alternative: set body style touch-action to 'none'. Achieves same result.
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'null';
        };
    }, []);
    const { currentTheme } = useSwitchableFluentTheme();
    const adapterAfterCreate = useCallback((adapter) => __awaiter(void 0, void 0, void 0, function* () {
        adapter.on('participantsRemoved', (listener) => {
            const removedParticipantIds = listener.participantsRemoved.map((p) => toFlatCommunicationIdentifier(p.id));
            if (removedParticipantIds.includes(userId)) {
                const removedBy = toFlatCommunicationIdentifier(listener.removedBy.id);
                endChatHandler(removedBy !== userId);
            }
        });
        adapter.on('error', (e) => {
            console.error(e);
        });
        return adapter;
    }), [endChatHandler, userId]);
    const adapterArgs = useMemo(() => ({
        endpoint: endpointUrl,
        userId: fromFlatCommunicationIdentifier(userId),
        displayName,
        credential: createAutoRefreshingCredential(userId, token),
        threadId
    }), [endpointUrl, userId, displayName, token, threadId]);
    const adapter = useAzureCommunicationChatAdapter(adapterArgs, adapterAfterCreate);
    // Dispose of the adapter in the window's before unload event
    useEffect(() => {
        const disposeAdapter = () => adapter === null || adapter === void 0 ? void 0 : adapter.dispose();
        window.addEventListener('beforeunload', disposeAdapter);
        return () => window.removeEventListener('beforeunload', disposeAdapter);
    }, [adapter]);
    if (adapter) {
        const onFetchAvatarPersonaData = (userId) => fetchEmojiForUser(userId).then((emoji) => new Promise((resolve) => {
            var _a;
            return resolve({
                imageInitials: emoji,
                initialsColor: emoji ? (_a = getBackgroundColor(emoji)) === null || _a === void 0 ? void 0 : _a.backgroundColor : undefined
            });
        }));
        return (React.createElement(Stack, { className: chatScreenContainerStyle },
            React.createElement(Stack.Item, { className: chatCompositeContainerStyle, role: "main" },
                React.createElement(ChatComposite, { adapter: adapter, fluentTheme: currentTheme.theme, options: {
                        autoFocus: 'sendBoxTextField'
                    }, onFetchAvatarPersonaData: onFetchAvatarPersonaData })),
            React.createElement(ChatHeader, { onEndChat: () => adapter.removeParticipant(userId) })));
    }
    return React.createElement(React.Fragment, null, "Initializing...");
};
//# sourceMappingURL=ChatScreen.js.map