/* Development References
https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email?tabs=windows%2Cconnection-string&pivots=programming-language-javascript

https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/connect-email-communication-resource?pivots=azure-portal
*/

import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email'
import { getResourceConnectionString, getEmailSender, getEmailRecipient } from '../../../../Server/src/lib/envHelper';

export const sendEmail = async (emailSubject: string, chatLink: string): Promise<string> => {
  const connectionString = getResourceConnectionString();
  const senderAddress = getEmailSender();
  const recipientAddress = getEmailRecipient();

  const POLLER_WAIT_TIME = 10

  const message = {
    senderAddress: senderAddress,
    recipients: {
      to: [{ address: recipientAddress }],
    },
    content: {
      subject: "Test email from JS Sample",
      plainText: "This is plaintext body of test email.",
      html: "<html><h1>This is the html body of test email.</h1></html>",
    },
  }

  try {
    const client = new EmailClient(connectionString);

    const poller = await client.beginSend(message);

    if (!poller.getOperationState().isStarted) {
      return "Poller was not started."
    }

    let timeElapsed = 0;
    while(!poller.isDone()) {
      poller.poll();
      console.log("Email send polling in progress");

      await new Promise(resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
      timeElapsed += 10;

      if(timeElapsed > 18 * POLLER_WAIT_TIME) {
        return "Polling timed out.";
      }
    }

    if(poller.getResult()?.status === KnownEmailSendStatus.Succeeded) {
      console.log(`Successfully sent the email (operation id: ${poller.getResult()?.id})`);
    }
    else {
      console.log(`Error: ${poller.getResult()?.error}`);
    }
  }
  catch(ex) {
    console.error(ex);
  }

  return "Default return";

};