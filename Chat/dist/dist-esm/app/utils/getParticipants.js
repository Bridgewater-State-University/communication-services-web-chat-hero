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
export const getParticipants = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = yield fetch(`/chat/threads/${threadId}/participants?api-version=2021-09-07`, requestOptions);
        if (response.status === StatusCode.CREATED) {
            return response.text();
        }
        else if (response.status === StatusCode.NOTFOUND) {
            return "No participants found.";
        }
    }
    catch (error) {
        console.error('Failed at adding user, Error: ', error);
    }
    return "No participants found. Possible error in attempt.";
});
//# sourceMappingURL=getParticipants.js.map