/**
 * Returns emoji string to caller based on userId. If emoji already exists in cache, return the cached emoji. Otherwise
 * makes a server request to get emoji. The returned emoji is a Promise<string> which may or may not be resolved so
 * caller should await it. There could potentially be many awaits happening so we may need to consider a callback style
 * approach.
 *
 * @param userId
 */
export declare const fetchEmojiForUser: (userId: string) => Promise<string>;
//# sourceMappingURL=emojiCache.d.ts.map