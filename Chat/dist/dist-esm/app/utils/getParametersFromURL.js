// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 *
 * The threadId of the current thread is extracted from the url
 * using URLsearchparams.
 *
 * @returns The current threadId as String
 *
 */
export const getExistingThreadIdFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const threadId = urlParams.get('threadId');
    return threadId;
};
/**
 *
 * The userId is extracted from the url
 * using URLsearchparams.
 *
 * @returns The userId as String
 *
 */
export const getExistingUserIdFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    return userId;
};
/**
 *
 * The token is extracted from the url
 * using URLsearchparams.
 *
 * @returns The token as String
 *
 */
export const getExistingTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    return token;
};
/**
 *
 * The endpointURL is extracted from the url
 * using URLsearchparams.
 *
 * @returns The endpointURL as String
 *
 */
export const getExistingEndpointURLFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const endpointUrl = urlParams.get('endpointUrl');
    return endpointUrl;
};
/**
 *
 * The displayName is extracted from the url
 * using URLsearchparams.
 *
 * @returns The displayName as String
 *
 */
export const getExistingDisplayNameFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const displayName = urlParams.get('displayName');
    return displayName;
};
//# sourceMappingURL=getParametersFromURL.js.map