/**
 * @author WMXPY
 * @namespace Orchestration_MapEspialInsert
 * @description Create Tasks
 */

import { Optional } from "@sudoo/optional";
import { PubAction_MapEspialSucceed_Iteration } from "../../action/definition/map-espial-succeed";
import { createPubTaskWithProcedure } from "../../task/factory/create";
import { PubMapFinalizeTask } from "../../task/implementation/map-finalize";
import { PubTaskBase } from "../../task/task-base";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { mapEspialInsertRecursiveCreateTask } from "./recursive-create-task";

export const mapEspialInsertCreateTasks = (
    configuration: PubCachedWorkflowConfiguration,
    firstIteration: PubAction_MapEspialSucceed_Iteration,
    mapFinalizeTask: PubMapFinalizeTask,
): PubTaskBase[] => {

    const taskProcedureMap: Map<string, PubTaskBase> = new Map();

    const startTask = createPubTaskWithProcedure(
        firstIteration.procedure,
    );

    taskProcedureMap.set(
        startTask.procedure.identifier,
        startTask,
    );

    mapEspialInsertRecursiveCreateTask(
        taskProcedureMap,
        configuration,
        firstIteration.procedure,
        Optional.ofAny(startTask),
        mapFinalizeTask,
    );

    return Array.from(taskProcedureMap.values());
};
