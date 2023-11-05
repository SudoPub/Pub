/**
 * @author WMXPY
 * @namespace Task_Mapping
 * @description Validate Full Procedure Output
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { TaskExecuteOutput } from "../definition/task";
import { validateFullProcedurePattern } from "./validate-pattern";

export const validateFullProcedureOutput = (
    procedure: PubProcedureConfiguration,
    output: TaskExecuteOutput,
): boolean => {

    switch (procedure.type) {

        case PUB_PROCEDURE_TYPE.START: {
            const startProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>;

            return validateFullProcedurePattern(
                startProcedure.payload.patterns,
                output,
            );
        }
        case PUB_PROCEDURE_TYPE.END: {
            const endProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>;

            return validateFullProcedurePattern(
                endProcedure.payload.patterns,
                output,
            );
        }
        case PUB_PROCEDURE_TYPE.DRIVER: {
            const driverProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>;

            return validateFullProcedurePattern(
                driverProcedure.payload.outcomePatterns,
                output,
            );
        }
        case PUB_PROCEDURE_TYPE.MAP: {
            const mapProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>;

            return validateFullProcedurePattern(
                mapProcedure.payload.outcomePatterns,
                output,
            );
        }
    }
    return false;
};
