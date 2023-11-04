/**
 * @author WMXPY
 * @namespace Orchestration_Initialize
 * @description Recursive Create Task
 */

import { Optional } from "@sudoo/optional";
import { PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { createPubTaskWithProcedure } from "../../task/factory/create";
import { PubTaskBase } from "../../task/task-base";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { findNextProcedures } from "../procedure/find-next-procedure";

export const initializeLoadRecursiveCreateTask = (
    taskProcedureMap: Map<string, PubTaskBase>,
    configuration: PubCachedWorkflowConfiguration,
    currentProcedure: PubProcedureConfiguration,
    currentTask: Optional<PubTaskBase>,
): void => {

    const nextProcedures: PubProcedureConfiguration[] = findNextProcedures(
        currentProcedure,
        configuration,
    );

    for (const nextProcedure of nextProcedures) {

        if (taskProcedureMap.has(nextProcedure.identifier)) {

            const previousTask: PubTaskBase =
                taskProcedureMap.get(nextProcedure.identifier) as PubTaskBase;

            previousTask.addDependency(currentTask.getOrThrow().taskIdentifier);
            continue;
        }

        const nextTask: PubTaskBase = createPubTaskWithProcedure(
            nextProcedure,
            currentTask.exists ? [currentTask.getOrThrow().taskIdentifier] : [],
        );

        taskProcedureMap.set(nextTask.procedureIdentifier, nextTask);

        initializeLoadRecursiveCreateTask(
            taskProcedureMap,
            configuration,
            configuration.getProcedureByIdentifier(
                nextTask.procedureIdentifier,
            ).getOrThrow(),
            Optional.ofAny(nextTask),
        );
    }
};
