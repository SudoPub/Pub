/**
 * @author WMXPY
 * @namespace Orchestration_Initialize
 * @description Recursive Create Task
 */

import { PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubTask } from "../../task/task";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { findNextProcedures } from "../procedure/find-next-procedure";

export const initializeRecursiveCreateTask = (
    configuration: PubCachedWorkflowConfiguration,
    currentProcedure: PubProcedureConfiguration,
    tasks: PubTask[],
): PubTask[] => {

    const nextProcedures: PubProcedureConfiguration[] = findNextProcedures(
        currentProcedure,
        configuration,
    );

    const nextTasks: PubTask[] = nextProcedures.map((procedure: PubProcedureConfiguration) => {

        return PubTask.fromIdentifier(procedure.identifier);
    });

    return [
        ...tasks,
        ...nextTasks,
    ];
};
