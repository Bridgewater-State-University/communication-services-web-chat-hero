// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from 'react';
import { People20Filled, People20Regular } from '@fluentui/react-icons';
import { useTheme } from '@azure/communication-react';
import { IconButton, mergeStyles } from '@fluentui/react';
export const PeopleButton = (props) => {
    const theme = useTheme();
    const participantListExpandedString = 'Participants list Button Expanded';
    const participantListCollapsedString = 'Participants list Button Collapsed';
    return (React.createElement(IconButton, { onRenderIcon: () => (props.isParticipantsDisplayed ? React.createElement(People20Filled, null) : React.createElement(People20Regular, null)), className: mergeStyles({ color: theme.palette.neutralPrimaryAlt }), onClick: () => props.setHideParticipants(props.isParticipantsDisplayed), ariaLabel: props.isParticipantsDisplayed ? participantListExpandedString : participantListCollapsedString }));
};
//# sourceMappingURL=PeopleButton.js.map