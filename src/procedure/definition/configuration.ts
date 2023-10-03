/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

import { Pattern } from "@sudoo/pattern";

export type PubProcedureConfigurationNext = {

    readonly procedureName: string;

    readonly conditions: Record<string, Pattern>;

    readonly mapping: Record<string, string>;
};

export enum PUB_PROCEDURE_TYPE {

    START = "START",
    DRIVER = "DRIVER",
    END = "END",
}

export type PubProcedureConfiguration =
    & PubProcedureConfigurationCommon
    & PubProcedureConfigurationSwitch;

export type PubProcedureConfigurationCommon = {

    readonly procedureName: string;
};

export type PubProcedureConfigurationSwitch =
    | PubProcedureConfigurationStart
    | PubProcedureConfigurationDriver
    | PubProcedureConfigurationEnd;

export type PubProcedureConfigurationStart = {

    readonly type: PUB_PROCEDURE_TYPE.START;
};

export type PubProcedureConfigurationDriver = {

    readonly type: PUB_PROCEDURE_TYPE.DRIVER;

    readonly driverName: string;

    readonly parameterPatterns: Record<string, Pattern>;
    readonly outcomePatterns: Record<string, Pattern>;

    readonly nextProcedures: PubProcedureConfigurationNext[];
};

export type PubProcedureConfigurationEnd = {

    readonly type: PUB_PROCEDURE_TYPE.END;
};
