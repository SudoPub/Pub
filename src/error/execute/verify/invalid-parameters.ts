/**
 * @author WMXPY
 * @namespace Error_Execute_Verify
 * @description Invalid Parameters
 */

import { Pattern } from "@sudoo/pattern";
import { PubExecuteVerifyError } from "./verify-error";

export class PubExecuteVerifyInvalidParametersError extends PubExecuteVerifyError {

    public static create(
        pattern: Pattern,
        parameters: any,
    ): PubExecuteVerifyInvalidParametersError {

        return new PubExecuteVerifyInvalidParametersError(
            `Invalid parameters, expected parameters to match pattern: ${JSON.stringify(pattern)}, got: ${JSON.stringify(parameters)}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubExecuteVerifyInvalidParametersError", reason);

        Object.setPrototypeOf(this, PubExecuteVerifyInvalidParametersError.prototype);
    }
}
