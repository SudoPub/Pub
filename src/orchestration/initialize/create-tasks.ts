/**
 * @author WMXPY
 * @namespace Orchestration_Initialize
 * @description Create Tasks
 */

import { Optional } from "@sudoo/optional";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubStartTask } from "../../task/implementation/start";
import { PubTaskBase } from "../../task/task-base";
import { PubTaskManager } from "../../task/task-manager";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { initializeLoadRecursiveCreateTask } from "./recursive-create-task";

export const initializeCreateTaskManager = (
    configuration: PubCachedWorkflowConfiguration,
): PubTaskManager => {

    const tasks: PubTaskBase[] = initializeCreateTasks(configuration);

    return PubTaskManager.withTasks(tasks, configuration);
};

export const initializeCreateTasks = (
    configuration: PubCachedWorkflowConfiguration,
): PubTaskBase[] => {

    const startProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>
        = configuration
            .getStartProcedure()
            .getOrThrow();

    const taskProcedureMap: Map<string, PubTaskBase> = new Map();

    const startTask = PubStartTask.fromProcedure(
        startProcedure,
    );

    taskProcedureMap.set(
        startTask.procedureIdentifier,
        startTask,
    );

    initializeLoadRecursiveCreateTask(
        taskProcedureMap,
        configuration,
        startProcedure,
        Optional.ofAny(startTask),
    );

    return Array.from(taskProcedureMap.values());
};
