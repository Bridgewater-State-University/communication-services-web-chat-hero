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
export const createThread = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestOptions = {
            method: 'POST'
        };
        const response = yield fetch('/createThread', requestOptions);
        if (response.status === StatusCode.OK) {
            return yield response.text();
        }
        else {
            throw new Error('Failed at creating thread ' + response.status);
        }
    }
    catch (error) {
        console.error('Failed creating thread, Error: ', error);
        throw new Error('Failed at creating thread');
    }
});
//# sourceMappingURL=createThread.js.map