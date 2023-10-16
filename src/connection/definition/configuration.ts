/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

export type PubConnectionConfiguration = {

    readonly identifier: string;

    readonly triggerProcedureIdentifier: string;
    readonly nextProcedureIdentifier: string;

    readonly parametersMapping: Record<string, string>;
};
