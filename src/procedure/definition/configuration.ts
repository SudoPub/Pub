/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

import { Pattern } from "@sudoo/pattern";

export enum PUB_PROCEDURE_TYPE {

    DRIVER = "DRIVER",
}

export type PubProcedureConfiguration<T extends PUB_PROCEDURE_TYPE> = {

    readonly procedureName: string;
    readonly type: T;

    readonly payload: PubProcedureConfigurationPayloadSwitch<T>;
};

export type PubProcedureConfigurationPayloadSwitch<T extends PUB_PROCEDURE_TYPE> =
    T extends PUB_PROCEDURE_TYPE.DRIVER ? PubProcedureConfigurationDriver :
    never;

export type PubProcedureConfigurationDriver = {

    readonly driverName: string;

    readonly parameterPatterns: Record<string, Pattern>;
    readonly outcomePatterns: Record<string, Pattern>;
};
