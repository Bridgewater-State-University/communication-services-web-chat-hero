import { ParticipantListParticipant, ParticipantList } from '@azure/communication-react';
//import { List, Stack } from '@fluentui/react';
import { Stack } from '@fluentui/react';
import React, { useState, useEffect } from 'react';

import { getExistingThreadIdFromURL } from './utils/getParametersFromURL';
import { getParticipants } from './utils/getParticipants';

export const ParticipantListComponent: () => JSX.Element = () => {
  const threadId = getExistingThreadIdFromURL() || "";
  const [chatParticipants, setChatParticipants] = useState<ParticipantListParticipant[]>([]);

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
    const init = async () => {
      if (threadId) {
        const getChatParticpants = await getParticipants(threadId);
        const chatParticpantsJson = JSON.parse(getChatParticpants);
        let chatParticipantList: ParticipantListParticipant[] = [];
        let chatParticipant: any = {};
        for (var i=0; i<chatParticpantsJson.value.length; i++) {
          chatParticipant = {
            userId: chatParticpantsJson.value.communicationIdentifier.communicationUser.id,
            displayName: chatParticpantsJson.value.displayName,
            isRemovable: true
          };
          chatParticipantList.push(chatParticipant);
        }
        setChatParticipants(chatParticipantList);
      }
    }
    init();
  });

  return (
    <Stack>
      <div style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Segoe UI' }}>Participants</div>
      <ParticipantList participants={chatParticipants} />
    </Stack>
  );
};