/**
 * @author WMXPY
 * @namespace Task_Apply
 * @description Task Resolve Succeed
 */

import { PUB_ACTION_TYPE, PubAction } from "../../action/definition/action";
import { PubTaskTaskManagerGetTaskNotFoundError } from "../../error/task/task-manager/get-task-not-found";
import { IPubTaskManager } from "../definition/task-manager";
import { PubTaskBase } from "../task-base";

export const applyTaskResolveSucceed = (
    action: PubAction<PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED>,
    taskManager: IPubTaskManager,
): void => {

    const task: PubTaskBase = taskManager
        .getTaskByIdentifier(action.payload.taskIdentifier)
        .getOrThrow(
            PubTaskTaskManagerGetTaskNotFoundError
                .withTaskIdentifier(action.payload.taskIdentifier),
        );

    console.log(task);
};
