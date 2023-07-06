import { ParticipantListParticipant, ParticipantList } from '@azure/communication-react';
import { Stack } from '@fluentui/react';
import React from 'react';

export const ParticipantListComponent: () => JSX.Element = () => {
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

  return (
    <Stack>
      <div style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Segoe UI' }}>Participants</div>
      <ParticipantList participants={mockParticipants} />
    </Stack>
  );
};