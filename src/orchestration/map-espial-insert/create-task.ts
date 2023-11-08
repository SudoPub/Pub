/**
 * @author WMXPY
 * @namespace Orchestration_MapEspialInsert
 * @description Create Tasks
 */

import { Optional } from "@sudoo/optional";
import { PubAction_MapEspialSucceed_Iteration } from "@sudopub/essential";
import { TaskExecuteInput } from "../../task/definition/task";
import { createPubTaskWithProcedure } from "../../task/factory/create";
import { PubMapFinalizeTask } from "../../task/implementation/map-finalize";
import { PubTaskBase } from "../../task/task-base";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { mapEspialInsertRecursiveCreateTask } from "./recursive-create-task";

export const mapEspialInsertCreateTasks = (
    configuration: PubCachedWorkflowConfiguration,
    input: TaskExecuteInput,
    firstIteration: PubAction_MapEspialSucceed_Iteration,
    mapFinalizeTask: PubMapFinalizeTask,
): PubTaskBase[] => {

    const taskProcedureMap: Map<string, PubTaskBase> = new Map();

    const startTask = createPubTaskWithProcedure(
        firstIteration.procedure,
    );

    startTask.combineInputWithMapping(
        input,
        firstIteration.connection.parametersMapping,
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
