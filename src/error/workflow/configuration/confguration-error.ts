/**
 * @author WMXPY
 * @namespace Error_Workflow_Configuration
 * @description Configuration
 */

import { PubWorkflowError } from "../workflow-error";

export class PubWorkflowConfigurationError extends PubWorkflowError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubWorkflowConfigurationError.prototype);
    }
}
