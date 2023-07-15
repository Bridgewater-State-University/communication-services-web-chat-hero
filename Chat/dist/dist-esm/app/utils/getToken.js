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
/**
 * This is implemented by contoso and passed to createAzureCommunicationChatAdapter
 */
export const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const getTokenRequestOptions = {
        method: 'POST'
    };
    const getTokenResponse = yield fetch('/token?scope=chat', getTokenRequestOptions);
    const responseJson = yield getTokenResponse.json();
    return {
        expiresOn: responseJson.expiresOn,
        identity: responseJson.user.communicationUserId,
        token: responseJson.token
    };
});
//# sourceMappingURL=getToken.js.map