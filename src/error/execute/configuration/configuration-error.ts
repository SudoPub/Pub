/**
 * @author WMXPY
 * @namespace Error_Execute_Configuration
 * @description Configuration
 */

import { PubExecuteError } from "../execute-error";

export class PubExecuteConfigurationError extends PubExecuteError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubExecuteConfigurationError.prototype);
    }
}
