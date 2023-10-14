/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

export enum PUB_CONNECTION_TYPE {

    CONDITIONAL = "CONDITIONAL",
}

export type PubConnectionConfiguration<T extends PUB_CONNECTION_TYPE> = {

    readonly triggerProcedure: string;
    readonly nextProcedure: string;

    readonly parametersMapping: Record<string, string>;

    readonly type: T;

    readonly payload: PubConnectionConfigurationPayloadSwitch<T>;
};

export type PubConnectionConfigurationPayloadSwitch<T extends PUB_CONNECTION_TYPE> =
    T extends PUB_CONNECTION_TYPE.CONDITIONAL ? PubConnectionConfiguration_Conditional :
    never;

export type PubConnectionConfiguration_Conditional = {

    // No Payload
};
