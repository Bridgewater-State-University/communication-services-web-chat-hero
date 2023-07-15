/// <reference types="react" />
interface ChatScreenProps {
    token: string;
    userId: string;
    displayName: string;
    endpointUrl: string;
    threadId: string;
    endChatHandler(isParticipantRemoved: boolean): void;
}
export declare const ChatScreen: (props: ChatScreenProps) => JSX.Element;
export {};
//# sourceMappingURL=ChatScreen.d.ts.map