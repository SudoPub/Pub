/**
 * @author WMXPY
 * @namespace Error_Execute_Verify
 * @description Invalid Parameters
 */

import { PubExecuteVerifyError } from "./verify-error";

export class PubExecuteVerifyInvalidParametersError extends PubExecuteVerifyError {

    public static create(): PubExecuteVerifyInvalidParametersError {

        return new PubExecuteVerifyInvalidParametersError(
            'Invalid Parameters',
            'INVALID_PARAMETERS',
        );
    }

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubExecuteVerifyInvalidParametersError.prototype);
    }
}
