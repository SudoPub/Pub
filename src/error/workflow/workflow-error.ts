/**
 * @author WMXPY
 * @namespace Error_Workflow
 * @description Workflow
 */

import { PubError } from "../pub-error";

export class PubWorkflowError extends PubError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubWorkflowError.prototype);
    }
}
