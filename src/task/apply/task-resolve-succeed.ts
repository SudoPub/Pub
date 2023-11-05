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
): boolean => {

    // Process Current Task
    const task: PubTaskBase = taskManager
        .getTaskByIdentifier(action.payload.taskIdentifier)
        .getOrThrow(
            PubTaskTaskManagerGetTaskNotFoundError
                .withTaskIdentifier(action.payload.taskIdentifier),
        );

    const combineResult: boolean = task.combineExecuteOutput(action.payload.output);

    if (!combineResult) {
        return false;
    }

    task.setTaskStatus(PUB_TASK_STATUS.RESOLVED);

    const dependents: PubTaskBase[] = taskManager.getTasksByDependency(task.taskIdentifier);

    for (const dependent of dependents) {

        dependent.resolveDependency(
            task.taskIdentifier,
            action.payload.output,
        );
    }
    return true;
};
