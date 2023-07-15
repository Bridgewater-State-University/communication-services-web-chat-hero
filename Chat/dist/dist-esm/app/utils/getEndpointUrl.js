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
let endpointUrl;
export const getEndpointUrl = () => __awaiter(void 0, void 0, void 0, function* () {
    if (endpointUrl === undefined) {
        try {
            const getRequestOptions = {
                method: 'GET'
            };
            const response = yield fetch('/getEndpointUrl', getRequestOptions);
            const retrievedendpointUrl = yield response.text().then((endpointUrl) => endpointUrl);
            endpointUrl = retrievedendpointUrl;
            return retrievedendpointUrl;
        }
        catch (error) {
            console.error('Failed at getting environment url, Error: ', error);
            throw new Error('Failed at getting environment url');
        }
    }
    else {
        return endpointUrl;
    }
});
//# sourceMappingURL=getEndpointUrl.js.map