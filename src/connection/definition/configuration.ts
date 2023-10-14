/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

import { PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE, PubConnectionProcedureReference } from "./procedure-reference";

export enum PUB_CONNECTION_TYPE {

    CONDITIONAL = "CONDITIONAL",
}

export type PubConnectionConfiguration<T extends PUB_CONNECTION_TYPE> = {

    readonly triggerProcedure: PubConnectionProcedureReference<
        PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE
    >;
    readonly nextProcedure: PubConnectionProcedureReference<
        PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE
    >;

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
