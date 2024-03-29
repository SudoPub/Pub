/**
 * @author WMXPY
 * @namespace Orchestration_MapEspialInsert
 * @description Recursive Create Task
 */

import { Optional } from "@sudoo/optional";
import { PubProcedureConfiguration } from "@sudopub/essential";
import { createPubTaskWithProcedure } from "../../task/factory/create";
import { PubMapFinalizeTask } from "../../task/implementation/map-finalize";
import { PubTaskBase } from "../../task/task-base";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { FindNextOperationItem, findNextOperations } from "../procedure/find-next-operation";

export const mapEspialInsertRecursiveCreateTask = (
    taskProcedureMap: Map<string, PubTaskBase>,
    configuration: PubCachedWorkflowConfiguration,
    currentProcedure: PubProcedureConfiguration,
    currentTask: Optional<PubTaskBase>,
    mapFinalizeTask: PubMapFinalizeTask,
): void => {

    const nextOperations: FindNextOperationItem[] = findNextOperations(
        currentProcedure,
        configuration,
    );

    if (nextOperations.length === 0) {
        mapFinalizeTask.addDependency(
            currentTask.getOrThrow().taskIdentifier,
            [],
        );
        return;
    }

    operation: for (const nextOperation of nextOperations) {

        if (taskProcedureMap.has(nextOperation.procedure.identifier)) {

            const previousTask: PubTaskBase =
                taskProcedureMap.get(nextOperation.procedure.identifier) as PubTaskBase;

            previousTask.addDependency(
                currentTask.getOrThrow().taskIdentifier,
                [nextOperation.connection.parametersMapping],
            );
            continue operation;
        }

        const nextTask: PubTaskBase = createPubTaskWithProcedure(
            nextOperation.procedure,
        );

        if (currentTask.exists) {
            nextTask.addDependency(
                currentTask.getOrThrow().taskIdentifier,
                [nextOperation.connection.parametersMapping],
            );
        }

        taskProcedureMap.set(nextTask.procedure.identifier, nextTask);

        mapEspialInsertRecursiveCreateTask(
            taskProcedureMap,
            configuration,
            configuration.getProcedureByIdentifier(
                nextTask.procedure.identifier,
            ).getOrThrow(),
            Optional.ofAny(nextTask),
            mapFinalizeTask,
        );
    }
};
