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
export const sendEmojiRequest = (identity, emoji) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postTokenRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Emoji: emoji })
        };
        yield (yield fetch('/userConfig/' + identity, postTokenRequestOptions)).json;
    }
    catch (error) {
        console.error('Failed at setting emoji, Error: ', error);
    }
});
//# sourceMappingURL=setEmoji.js.map