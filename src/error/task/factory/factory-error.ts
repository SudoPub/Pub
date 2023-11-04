/**
 * @author WMXPY
 * @namespace Error_Task_Factory
 * @description Factory
 */

import { PubTaskError } from "../task-error";

export class PubTaskFactoryError extends PubTaskError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubTaskFactoryError.prototype);
    }
}
