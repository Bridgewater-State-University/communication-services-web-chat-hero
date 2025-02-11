/// <reference types="react" />
interface DisplayNameFieldProps {
    setName(displayName: string): void;
    setEmptyWarning(isEmpty: boolean): void;
    isEmpty: boolean;
    defaultName?: string;
    validateName?(): void;
}
export declare const DisplayNameField: (props: DisplayNameFieldProps) => JSX.Element;
export {};
//# sourceMappingURL=DisplayNameField.d.ts.map