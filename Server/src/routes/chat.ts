import { ChatClient, SendMessageOptions } from '@azure/communication-chat';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import * as express from 'express';
import { getEndpoint } from '../lib/envHelper';
import { getAdminUser, getToken } from '../lib/identityClient';

const router = express.Router();
  
router.get('/:threadId', async function (req, res, next) {
  const threadId = req.params['threadId'];

  // create a user from the adminUserId and create a credential around that
  const credential = new AzureCommunicationTokenCredential({
    tokenRefresher: async () => (await getToken(getAdminUser(), ['chat', 'voip'])).token,
    refreshProactively: true
  });

  const chatClient = new ChatClient(getEndpoint(), credential);
  const chatThreadClient = await chatClient.getChatThreadClient(threadId);

  try {
    const sendMessageRequest = {
        content: 'A live support chat has been initiated with our department. Please be patient as we connect you to an expert support representative.'
    };
    const sendMessageOptions:SendMessageOptions = {
        senderDisplayName: "Chat Administrator",
        type: "text"
    };
    const sendChatMessageResult = await chatThreadClient.sendMessage(sendMessageRequest, sendMessageOptions);
    const messageId = sendChatMessageResult.id;
    console.log('Logged message to messageId: ' + messageId);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(404);
  }
});

export default router;
