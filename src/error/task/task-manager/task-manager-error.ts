/**
 * @author WMXPY
 * @namespace Error_Task_TaskManager
 * @description Task Manager Error
 */

import { PubTaskError } from "../task-error";

export class PubTaskTaskManagerError extends PubTaskError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubTaskTaskManagerError.prototype);
    }
}
