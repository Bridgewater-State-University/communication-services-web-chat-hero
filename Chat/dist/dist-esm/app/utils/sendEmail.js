/* Development References
https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email?tabs=windows%2Cconnection-string&pivots=programming-language-javascript

https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/connect-email-communication-resource?pivots=azure-portal

https://frankchen2016.medium.com/send-email-on-behalf-of-a-service-account-using-office-graph-api-6b013728a155#:~:text=I%20will%20outline%20some%20of%20important%20steps%20as,someone%20else.%203%20Create%20a%20X.509%20certificate.%20
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';
//import { getResourceConnectionString, getEmailSender, getEmailRecipient } from '../../../../Server/src/lib/envHelper';
export const sendEmail = (emailRecipient, emailSubject, chatLink) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    //const connectionString = getResourceConnectionString();
    const connectionString = "endpoint=https://acs-sysopsdevtest-acs-eus-001.communication.azure.com/;accesskey=SKYWORjco+yRWdmDlDnav42pan0B2fBvh9KOxlTZ073OhKVLSpN/fWshGi1jV8JEE8OzqqZkzPGoEIcLu4yxgw==";
    //const senderAddress = getEmailSender();
    const senderAddress = "DoNotReply@ecs.bridgew.edu";
    const POLLER_WAIT_TIME = 10;
    const messageText = `<html><head></head><body>A suppport chat has been initiated: ${chatLink}.</body></html>`;
    const message = {
        senderAddress: senderAddress,
        recipients: {
            to: [{ address: emailRecipient }],
        },
        content: {
            subject: emailSubject,
            plainText: "A support chat has been initiated: " + chatLink,
            html: messageText,
        },
    };
    try {
        const client = new EmailClient(connectionString);
        const poller = yield client.beginSend(message);
        if (!poller.getOperationState().isStarted) {
            return "Poller was not started.";
        }
        let timeElapsed = 0;
        while (!poller.isDone()) {
            poller.poll();
            console.log("Email send polling in progress");
            yield new Promise(resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
            timeElapsed += 10;
            if (timeElapsed > 18 * POLLER_WAIT_TIME) {
                return "Polling timed out.";
            }
        }
        if (((_a = poller.getResult()) === null || _a === void 0 ? void 0 : _a.status) === KnownEmailSendStatus.Succeeded) {
            console.log(`Successfully sent the email (operation id: ${(_b = poller.getResult()) === null || _b === void 0 ? void 0 : _b.id})`);
        }
        else {
            console.log(`Error: ${(_c = poller.getResult()) === null || _c === void 0 ? void 0 : _c.error}`);
        }
    }
    catch (ex) {
        console.error(ex);
    }
    return "Success";
});
//# sourceMappingURL=sendEmail.js.map