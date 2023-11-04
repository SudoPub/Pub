/**
 * @author WMXPY
 * @namespace Error_Task_Ensure
 * @description Empty Input
 */

import { PubTaskEnsureError } from "./ensure-error";

export class PubTaskEnsureEmptyInputTypeError extends PubTaskEnsureError {

    public static withTaskIdentifier(
        taskIdentifier: string,
    ): PubTaskEnsureEmptyInputTypeError {

        return new PubTaskEnsureEmptyInputTypeError(
            `Empty input: ${taskIdentifier}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubTaskEnsureEmptyInputTypeError", reason);

        Object.setPrototypeOf(this, PubTaskEnsureEmptyInputTypeError.prototype);
    }
}
