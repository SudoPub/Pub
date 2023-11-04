/**
 * @author WMXPY
 * @namespace Error_Task
 * @description Task
 */

import { PubError } from "../pub-error";

export class PubTaskError extends PubError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubTaskError.prototype);
    }
}
