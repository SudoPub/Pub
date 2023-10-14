/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

import { Pattern } from "@sudoo/pattern";

export enum PUB_PROCEDURE_TYPE {

    DRIVER = "DRIVER",
    MAP = "MAP",
}

export type PubProcedureConfiguration<T extends PUB_PROCEDURE_TYPE> = {

    readonly procedureName: string;
    readonly type: T;

    readonly payload: PubProcedureConfigurationPayloadSwitch<T>;
};

export type PubProcedureConfigurationPayloadSwitch<T extends PUB_PROCEDURE_TYPE> =
    T extends PUB_PROCEDURE_TYPE.DRIVER ? PubProcedureConfiguration_Driver :
    T extends PUB_PROCEDURE_TYPE.MAP ? PubProcedureConfiguration_Map :
    never;

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
