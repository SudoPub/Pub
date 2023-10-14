/**
 * @author WMXPY
 * @namespace Definition
 * @description Procedure Reference
 */

export enum PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE {

    START = "START",
    PROCEDURE = "PROCEDURE",
    END = "END",
}

export type PubConnectionProcedureReference<T extends PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE> = {

    readonly type: T;
    readonly payload: PubConnectionProcedureReferencePayloadSwitch<T>;
};

export type PubConnectionProcedureReferencePayloadSwitch<T extends PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE> =
    T extends PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.START ? PubConnectionProcedureReferencePayload_Start :
    T extends PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.PROCEDURE ? PubConnectionProcedureReferencePayload_Procedure :
    T extends PUB_CONNECTION_PROCEDURE_REFERENCE_TYPE.END ? PubConnectionProcedureReferencePayload_End :
    never;

export type PubConnectionProcedureReferencePayload_Start = {

    // No Payload
};

export type PubConnectionProcedureReferencePayload_Procedure = {

    readonly procedureIdentifier: string;
};

export type PubConnectionProcedureReferencePayload_End = {

    // No Payload
};
