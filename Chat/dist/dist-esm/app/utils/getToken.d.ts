export declare type UserToken = {
    expiresOn: number;
    identity: string;
    token: string;
};
/**
 * This is implemented by contoso and passed to createAzureCommunicationChatAdapter
 */
export declare const getToken: () => Promise<UserToken>;
//# sourceMappingURL=getToken.d.ts.map