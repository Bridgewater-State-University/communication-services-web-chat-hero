/**
 * This is a Contoso specific method. Specific to Sample App Heroes. Its meant to be called by Sample App Heroes
 * to add user to thread. Components will automatically know about the new participant when calling listParticipants.
 *
 * @param threadId the acs chat thread id
 * @param userId the acs communication user id
 * @param displayName the new participant's display name
 */
export declare const joinThread: (threadId: string, userId: string, displayName: string) => Promise<boolean>;
export declare const autoPostThread: (threadId: string, Message: string) => Promise<boolean>;
//# sourceMappingURL=joinThread.d.ts.map