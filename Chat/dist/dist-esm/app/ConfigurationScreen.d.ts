/// <reference types="react" />
export interface ConfigurationScreenProps {
    joinChatHandler(): void;
    setToken(token: string): void;
    setUserId(userId: string): void;
    setDisplayName(displayName: string): void;
    setThreadId(threadId: string): void;
    setEndpointUrl(endpointUrl: string): void;
}
declare const _default: (props: ConfigurationScreenProps) => JSX.Element;
/**
 * There are four states of ConfigurationScreen.
 * 1. Loading configuration screen state. This will show 'loading' spinner on the screen.
 * 2. Join chat screen. This will show a name selector.
 * 3. Invalid thread state. This will show 'thread id is not valid' on the screen.
 * 4. Loading chat spinner. This will show 'initializing chat client' spinner on the screen.
 *
 * @param props
 */
export default _default;
//# sourceMappingURL=ConfigurationScreen.d.ts.map