/**
 * @author WMXPY
 * @namespace Orchestration_Initialize
 * @description Create Tasks
 */

import { Optional } from "@sudoo/optional";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubTaskBase } from "../../task/task-base";
import { PubTaskManager } from "../../task/task-manager";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { initializeRecursiveCreateTask } from "./recursive-create-task";

export const initializeCreateTaskManager = (
    configuration: PubCachedWorkflowConfiguration,
): PubTaskManager => {

    const tasks: PubTaskBase[] = initializeCreateTasks(configuration);

    return PubTaskManager.withTasks(tasks);
};

export const initializeCreateTasks = (
    configuration: PubCachedWorkflowConfiguration,
): PubTaskBase[] => {

    const startProcedure: Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>>
        = configuration.getStartProcedure();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const endProcedure: Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>>
        = configuration.getEndProcedure();

    const tasks: PubTaskBase[] = initializeRecursiveCreateTask(
        configuration,
        startProcedure.getOrThrow(),
        Optional.ofEmpty(),
    );

    return tasks;
};
