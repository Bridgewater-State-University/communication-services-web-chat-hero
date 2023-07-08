// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultButton, PrimaryButton, Stack, Link, Text } from '@fluentui/react';
import React, { useCallback, useState } from 'react';
import {
  bottomStackFooterStyle,
  buttonStyle,
  buttonWithIconStyles,
  buttonsStackTokens,
  chatIconStyle,
  endChatContainerStyle,
  endChatTitleStyle,
  mainStackTokens,
  upperStackTokens
} from './styles/EndChat.styles';

import { Chat20Filled } from '@fluentui/react-icons';
import { getExistingThreadIdFromURL } from './utils/getParametersFromURL';
import { joinThread } from './utils/joinThread';

export interface EndCallProps {
  userId: string;
  displayName: string;
  rejoinHandler(): void;
  homeHandler(): void;
}

export const EndScreen = (props: EndCallProps): JSX.Element => {
  const leftCall = 'You left the chat';
  const goHomePage = 'Go to homepage';
  const rejoinChat = 'Rejoin chat';
  const rejoining = 'Rejoining...';

  const [isRejoiningThread, setIsRejoiningThread] = useState(false);

  const { rejoinHandler, userId, displayName } = props;

  const rejoinThread = useCallback(async (): Promise<void> => {
    if (!isRejoiningThread) {
      const threadId = getExistingThreadIdFromURL();
      if (!threadId) {
        console.error('thread id is null');
        return;
      }

      // potential issue where someone changes the threadId in the url to something the adminUserId is not already in.
      // this will throw an exception on the server and we will fail to rejoin the chat thread
      const didJoin = await joinThread(threadId, userId, displayName);
      if (!didJoin) {
        console.error('invalid thread. unable to add the user to this thread');
        return;
      }

      setIsRejoiningThread(true);
      rejoinHandler();
    }
  }, [isRejoiningThread, displayName, userId, rejoinHandler]);

  const feedbackLink =
    'https://studentbridgew.sharepoint.com/Lists/Feedback/NewForm.aspx?Source=https%3A%2F%2Fstudentbridgew%2Esharepoint%2Ecom%2FSitePages%2FThank%2DYou%2Dfor%2Dyour%2DFeedback%2Easpx&RootFolder=%2FLists%2FFeedback';

  return (
    <Stack
      horizontal
      wrap
      horizontalAlign="center"
      verticalAlign="center"
      tokens={mainStackTokens}
      className={endChatContainerStyle}
    >
      <Stack tokens={upperStackTokens}>
        <Text role={'heading'} aria-level={1} aria-label={leftCall} aria-live={'polite'} className={endChatTitleStyle}>
          {leftCall}
        </Text>
        <Stack horizontal wrap tokens={buttonsStackTokens}>
          <PrimaryButton
            disabled={isRejoiningThread}
            className={buttonStyle}
            styles={buttonWithIconStyles}
            text={isRejoiningThread ? rejoining : rejoinChat}
            onClick={async () => {
              await rejoinThread();
            }}
            onRenderIcon={() => <Chat20Filled className={chatIconStyle} />}
          />

          <DefaultButton
            className={buttonStyle}
            styles={buttonWithIconStyles}
            text={goHomePage}
            onClick={props.homeHandler}
          />
        </Stack>
        <div className={bottomStackFooterStyle}>
          <Link href={feedbackLink}>Give Feedback</Link>
          &nbsp;on this Support Chat app.
        </div>
      </Stack>
    </Stack>
  );
};
