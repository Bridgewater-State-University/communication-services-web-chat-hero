export declare const localStorageAvailable: boolean;
export declare enum LocalStorageKeys {
    Theme = "AzureCommunicationUI_Theme"
}
/**
 * Get theme from local storage.
 */
export declare const getThemeFromLocalStorage: (scopeId: string) => string | null;
/**
 * Save theme into local storage.
 */
export declare const saveThemeToLocalStorage: (theme: string, scopeId: string) => void;
//# sourceMappingURL=localStorage.d.ts.map