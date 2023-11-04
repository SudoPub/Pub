/**
 * @author WMXPY
 * @namespace Error_Task_Ensure
 * @description Empty Output
 */

import { PubTaskEnsureError } from "./ensure-error";

export class PubTaskEnsureEmptyOutputTypeError extends PubTaskEnsureError {

    public static withTaskIdentifier(
        taskIdentifier: string,
    ): PubTaskEnsureEmptyOutputTypeError {

        return new PubTaskEnsureEmptyOutputTypeError(
            `Empty output: ${taskIdentifier}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubTaskEnsureEmptyOutputTypeError", reason);

        Object.setPrototypeOf(this, PubTaskEnsureEmptyOutputTypeError.prototype);
    }
}
