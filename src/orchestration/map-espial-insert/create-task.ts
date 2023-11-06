/**
 * @author WMXPY
 * @namespace Orchestration_MapEspialInsert
 * @description Create Tasks
 */

import { Optional } from "@sudoo/optional";
import { PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { createPubTaskWithProcedure } from "../../task/factory/create";
import { PubMapFinalizeTask } from "../../task/implementation/map-finalize";
import { PubTaskBase } from "../../task/task-base";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { mapEspialInsertRecursiveCreateTask } from "./recursive-create-task";

export const mapEspialInsertCreateTasks = (
    configuration: PubCachedWorkflowConfiguration,
    firstProcedure: PubProcedureConfiguration,
    mapFinalizeTask: PubMapFinalizeTask,
): PubTaskBase[] => {

    const taskProcedureMap: Map<string, PubTaskBase> = new Map();

    const startTask = createPubTaskWithProcedure(
        firstProcedure,
    );

    taskProcedureMap.set(
        startTask.procedure.identifier,
        startTask,
    );

    mapEspialInsertRecursiveCreateTask(
        taskProcedureMap,
        configuration,
        firstProcedure,
        Optional.ofAny(startTask),
        mapFinalizeTask,
    );

    return Array.from(taskProcedureMap.values());
};
