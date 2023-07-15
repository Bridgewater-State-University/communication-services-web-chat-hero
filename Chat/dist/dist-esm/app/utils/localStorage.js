// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export const localStorageAvailable = typeof Storage !== 'undefined';
export var LocalStorageKeys;
(function (LocalStorageKeys) {
    LocalStorageKeys["Theme"] = "AzureCommunicationUI_Theme";
})(LocalStorageKeys || (LocalStorageKeys = {}));
/**
 * Get theme from local storage.
 */
export const getThemeFromLocalStorage = (scopeId) => window.localStorage.getItem(LocalStorageKeys.Theme + '_' + scopeId);
/**
 * Save theme into local storage.
 */
export const saveThemeToLocalStorage = (theme, scopeId) => window.localStorage.setItem(LocalStorageKeys.Theme + '_' + scopeId, theme);
//# sourceMappingURL=localStorage.js.map