/**
 * @author WMXPY
 * @namespace Error_Execute_Verify
 * @description Verify
 */

import { PubExecuteError } from "../execute-error";

export class PubExecuteVerifyError extends PubExecuteError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubExecuteVerifyError.prototype);
    }
}
