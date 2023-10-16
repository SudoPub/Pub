/**
 * @author WMXPY
 * @namespace Error_Record_Enrich
 * @description Enrich
 */

import { PubRecordError } from "../record-error";

export class PubRecordEnrichError extends PubRecordError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, PubRecordEnrichError.prototype);
    }
}
