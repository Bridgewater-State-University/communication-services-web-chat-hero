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
import { StatusCode } from './constants';
/**
 * This is a Contoso specific method. Specific to Sample App Heroes. Its meant to be called by Sample App Heroes
 * to add user to thread. Components will automatically know about the new participant when calling listParticipants.
 *
 * @param threadId the acs chat thread id
 * @param userId the acs communication user id
 * @param displayName the new participant's display name
 */
export const joinThread = (threadId, userId, displayName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Id: userId, DisplayName: displayName })
        };
        const response = yield fetch(`/addUser/${threadId}`, requestOptions);
        if (response.status === StatusCode.CREATED) {
            return true;
        }
        // if we are attempting to add a user to a thread that is not a thread our admin user is already a part of to add in this user
        // we would be unable to add the user
        // so we are returning a 404 if the thread we want to add them to cannot be accessed by our server user
        else if (response.status === StatusCode.NOTFOUND) {
            return false;
        }
    }
    catch (error) {
        console.error('Failed at adding user, Error: ', error);
    }
    return false;
});
export const autoPostThread = (threadId, Message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestOptions = {
            method: 'GET'
        };
        const response = yield fetch(`/chat/${threadId}/${Message}`, requestOptions);
        if (response.status === StatusCode.CREATED) {
            return true;
        }
        else if (response.status === StatusCode.NOTFOUND) {
            return false;
        }
    }
    catch (error) {
        console.error('Failed to post message to thread, Error: ', error);
    }
    return false;
});
//# sourceMappingURL=joinThread.js.map