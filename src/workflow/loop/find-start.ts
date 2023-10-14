/**
 * @author WMXPY
 * @namespace Loop
 * @description Find Start
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubWorkflowConfiguration } from "../definition/configuration";
import { compareProcedureWithType } from "./compare-procedure";

export const findStartProcedure = (
    configuration: PubWorkflowConfiguration,
): PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START> | null => {

    for (const procedure of configuration.procedures) {

        if (compareProcedureWithType(procedure, PUB_PROCEDURE_TYPE.START)) {

            return procedure;
        }
    }

    return null;
};
