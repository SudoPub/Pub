/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

import { Pattern } from "@sudoo/pattern";

export enum PUB_PROCEDURE_TYPE {

    START = "START",
    DRIVER = "DRIVER",
    END = "END",
}

export type PubProcedureConfigurationNext = {

    readonly procedureName: string;

    readonly conditions: Record<string, Pattern>;

    readonly mapping: Record<string, string>;
};

export type PubProcedureConfiguration =
    | {

        readonly type: PUB_PROCEDURE_TYPE.START;
    }
    | {

        readonly type: PUB_PROCEDURE_TYPE.DRIVER;
        readonly procedureName: string;

        readonly driverName: string;

        readonly parameterPatterns: Record<string, Pattern>;
        readonly outcomePatterns: Record<string, Pattern>;

        readonly nextProcedures: PubProcedureConfigurationNext[];
    }
    | {

        readonly type: PUB_PROCEDURE_TYPE.END;
    };
