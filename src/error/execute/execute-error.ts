/**
 * @author WMXPY
 * @namespace Error_Execute
 * @description Execute
 */

import { PubError } from "../pub-error";

export class PubExecuteError extends PubError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubExecuteError.prototype);
    }
}
