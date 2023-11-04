/**
 * @author WMXPY
 * @namespace Orchestration_Initialize
 * @description Recursive Create Task
 */

import { PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { createPubTaskWithProcedure } from "../../task/factory/create";
import { PubTaskBase } from "../../task/task-base";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { findNextProcedures } from "../procedure/find-next-procedure";

export const initializeRecursiveCreateTask = (
    configuration: PubCachedWorkflowConfiguration,
    currentProcedure: PubProcedureConfiguration,
): PubTaskBase[] => {

    const nextProcedures: PubProcedureConfiguration[] = findNextProcedures(
        currentProcedure,
        configuration,
    );

    const nextTasks: PubTaskBase[] = nextProcedures.map((procedure: PubProcedureConfiguration) => {

        return createPubTaskWithProcedure(procedure);
    });

    return [
        ...nextTasks,
        ...nextTasks.reduce((previous: PubTaskBase[], nextTask: PubTaskBase) => {

            return [
                ...previous,
                ...initializeRecursiveCreateTask(
                    configuration,
                    configuration.getProcedureByIdentifier(
                        nextTask.procedureIdentifier,
                    ).getOrThrow()
                ),
            ];
        }, []),
    ];
};
