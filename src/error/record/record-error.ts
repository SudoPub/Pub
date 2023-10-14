/**
 * @author WMXPY
 * @namespace Error_Record
 * @description Record
 */

import { PubError } from "../pub-error";

export class PubRecordError extends PubError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubRecordError.prototype);
    }
}
