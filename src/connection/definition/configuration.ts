/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

export type PubConnectionConfiguration = {

    readonly identifier: string;

    readonly triggerProcedure: string;
    readonly nextProcedure: string;

    readonly parametersMapping: Record<string, string>;
};
