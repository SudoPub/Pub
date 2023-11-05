/**
 * @author WMXPY
 * @namespace Task_Mapping
 * @description Validate Procedure Input
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { TaskExecuteInput } from "../definition/task";
import { validatePartialProcedurePattern } from "./validate-pattern";

export const validateProcedureInput = (
    procedure: PubProcedureConfiguration,
    input: TaskExecuteInput,
): boolean => {

    switch (procedure.type) {

        case PUB_PROCEDURE_TYPE.START: {
            const startProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>;

            return validatePartialProcedurePattern(
                startProcedure.payload.patterns,
                input,
            );
        }
        case PUB_PROCEDURE_TYPE.END: {
            const endProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>;

            return validatePartialProcedurePattern(
                endProcedure.payload.patterns,
                input,
            );
        }
        case PUB_PROCEDURE_TYPE.DRIVER: {
            const driverProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>;

            return validatePartialProcedurePattern(
                driverProcedure.payload.parameterPatterns,
                input,
            );
        }
        case PUB_PROCEDURE_TYPE.MAP: {
            const mapProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP> =
                procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP>;

            return validatePartialProcedurePattern(
                mapProcedure.payload.parameterPatterns,
                input,
            );
        }
    }
    return false;
};
