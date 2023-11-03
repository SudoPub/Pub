/**
 * @author WMXPY
 * @namespace Orchestration_Initialize
 * @description Recursive Add Task
 */

import { PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubTask } from "../../task/task";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { findNextProcedures } from "../procedure/find-next-procedure";

export const initializeRecursiveAddTask = (
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
