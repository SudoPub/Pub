/**
 * @author WMXPY
 * @namespace Error_Task_TaskManager
 * @description Get Task Not Found
 */

import { PubTaskTaskManagerError } from "./task-manager-error";

export class PubTaskTaskManagerGetTaskNotFoundError extends PubTaskTaskManagerError {

    public static withTaskIdentifier(
        taskIdentifier: string,
    ): PubTaskTaskManagerGetTaskNotFoundError {

        return new PubTaskTaskManagerGetTaskNotFoundError(
            `Task not found by identifier: ${taskIdentifier}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubTaskTaskManagerGetTaskNotFoundError", reason);

        Object.setPrototypeOf(this, PubTaskTaskManagerGetTaskNotFoundError.prototype);
    }
}
