var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ParticipantList } from '@azure/communication-react';
//import { List, Stack } from '@fluentui/react';
import { Stack } from '@fluentui/react';
import React, { useState, useEffect } from 'react';
import { getExistingThreadIdFromURL } from './utils/getParametersFromURL';
import { getParticipants } from './utils/getParticipants';
export const ParticipantListComponent = () => {
    const threadId = getExistingThreadIdFromURL() || "";
    const [chatParticipants, setChatParticipants] = useState([]);
    /*
    const mockParticipants: ParticipantListParticipant[] = [
      {
        userId: 'user 1',
        displayName: 'You',
        isRemovable: true
      },
      {
        userId: 'user 2',
        displayName: 'Registrar\'s Office',
        isRemovable: false
      }
    ];
    */
    useEffect(() => {
        // useEffect runs on every render
        // https://www.w3schools.com/react/react_useeffect.asp
        // https://www.w3schools.com/react/react_usestate.asp
        const init = () => __awaiter(void 0, void 0, void 0, function* () {
            if (threadId) {
                const getChatParticpants = yield getParticipants(threadId);
                const chatParticpantsJson = JSON.parse(getChatParticpants);
                let chatParticipantList = [];
                let chatParticipant = {};
                for (var i = 0; i < chatParticpantsJson.value.length; i++) {
                    chatParticipant = {
                        userId: chatParticpantsJson.value.communicationIdentifier.communicationUser.id,
                        displayName: chatParticpantsJson.value.displayName,
                        isRemovable: true
                    };
                    chatParticipantList.push(chatParticipant);
                }
                setChatParticipants(chatParticipantList);
            }
        });
        init();
    });
    return (React.createElement(Stack, null,
        React.createElement("div", { style: { fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Segoe UI' } }, "Participants"),
        React.createElement(ParticipantList, { participants: chatParticipants })));
};
//# sourceMappingURL=ParticipantListComponent.js.map