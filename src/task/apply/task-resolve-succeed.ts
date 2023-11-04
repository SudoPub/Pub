/**
 * @author WMXPY
 * @namespace Task_Apply
 * @description Task Resolve Succeed
 */

import { PUB_ACTION_TYPE, PubAction } from "../../action/definition/action";
import { PubTaskTaskManagerGetTaskNotFoundError } from "../../error/task/task-manager/get-task-not-found";
import { PUB_TASK_STATUS } from "../definition/task";
import { PubTaskBase } from "../task-base";
import { PubTaskManager } from "../task-manager";

export const applyTaskResolveSucceedOnTaskManager = (
    action: PubAction<PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED>,
    taskManager: PubTaskManager,
): void => {

    // Process Current Task
    const task: PubTaskBase = taskManager
        .getTaskByIdentifier(action.payload.taskIdentifier)
        .getOrThrow(
            PubTaskTaskManagerGetTaskNotFoundError
                .withTaskIdentifier(action.payload.taskIdentifier),
        );

    task.setTaskStatus(PUB_TASK_STATUS.RESOLVED);
    task.combineExecuteOutput(action.payload.output);

    const dependencies: PubTaskBase[] = taskManager.getTasksByDependency(task.taskIdentifier);

    for (const dependency of dependencies) {

        dependency.combineExecuteInput(action.payload.output);

        dependency.removeDependency(task.taskIdentifier);
    }
};
