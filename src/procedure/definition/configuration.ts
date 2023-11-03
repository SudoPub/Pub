/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

import { Pattern } from "@sudoo/pattern";

export enum PUB_PROCEDURE_TYPE {

    // Procedure Control
    START = "START",
    END = "END",

    // Action Taking
    DRIVER = "DRIVER",

    // Data Manipulation
    MAP = "MAP",
}

export type PubProcedureConfiguration<T extends PUB_PROCEDURE_TYPE = PUB_PROCEDURE_TYPE> = {

    readonly identifier: string;
    readonly type: T;

    readonly payload: PubProcedureConfigurationPayloadSwitch<T>;
};

export type PubProcedureConfigurationPayloadSwitch<T extends PUB_PROCEDURE_TYPE> =
    T extends PUB_PROCEDURE_TYPE.START ? PubProcedureConfiguration_Start :
    T extends PUB_PROCEDURE_TYPE.END ? PubProcedureConfiguration_End :
    T extends PUB_PROCEDURE_TYPE.DRIVER ? PubProcedureConfiguration_Driver :
    T extends PUB_PROCEDURE_TYPE.MAP ? PubProcedureConfiguration_Map :
    never;

export type PubProcedureConfiguration_Start = {

    readonly patterns: Record<string, Pattern>;
};

export type PubProcedureConfiguration_End = {

    readonly patterns: Record<string, Pattern>;
};

export type PubProcedureConfiguration_Driver = {

    readonly driverName: string;

    readonly parameterPatterns: Record<string, Pattern>;
    readonly outcomePatterns: Record<string, Pattern>;
};

export type PubProcedureConfiguration_Map = {

    readonly mapName: string;

    readonly parameterPatterns: Record<string, Pattern>;
    readonly outcomePatterns: Record<string, Pattern>;
};
