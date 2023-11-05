/**
 * @author WMXPY
 * @namespace Task_Mapping
 * @description Validate Partial Procedure Output
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { TaskExecuteOutput } from "../definition/task";
import { validatePartialProcedurePattern } from "./validate-pattern";

export const validatePartialProcedureOutput = (
    procedure: PubProcedureConfiguration,
    output: TaskExecuteOutput,
): boolean => {

    switch (procedure.type) {

        case PUB_PROCEDURE_TYPE.START: {
            const startProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>;

            return validatePartialProcedurePattern(
                startProcedure.payload.patterns,
                output,
            );
        }
        case PUB_PROCEDURE_TYPE.END: {
            const endProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>;

            return validatePartialProcedurePattern(
                endProcedure.payload.patterns,
                output,
            );
        }
        case PUB_PROCEDURE_TYPE.DRIVER: {
            const driverProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>;

            return validatePartialProcedurePattern(
                driverProcedure.payload.outcomePatterns,
                output,
            );
        }
        case PUB_PROCEDURE_TYPE.MAP: {
            const mapProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>;

            return validatePartialProcedurePattern(
                mapProcedure.payload.outcomePatterns,
                output,
            );
        }
    }
    return false;
};
