/**
 * @author WMXPY
 * @namespace Orchestration_Initialize
 * @description Initialize Tasks
 */

import { Optional } from "@sudoo/optional";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubTask } from "../../task/task";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";

export const initializeCreateTasks = (
    configuration: PubCachedWorkflowConfiguration,
): PubTask[] => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const startProcedure: Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>>
        = configuration.getStartProcedure();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const endProcedure: Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>>
        = configuration.getEndProcedure();

    return [];
};
