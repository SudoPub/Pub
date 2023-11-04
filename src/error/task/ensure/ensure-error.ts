/**
 * @author WMXPY
 * @namespace Error_Task_Ensure
 * @description Ensure
 */

import { PubTaskError } from "../task-error";

export class PubTaskEnsureError extends PubTaskError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubTaskEnsureError.prototype);
    }
}
