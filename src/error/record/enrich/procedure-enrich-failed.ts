/**
 * @author WMXPY
 * @namespace Error_Record_Enrich
 * @description Procedure Enrich Failed
 */

import { PubRecordEnrichError } from "./enrich-error";

export class PubRecordEnrichProcedureEnrichFailedError extends PubRecordEnrichError {

    public static create(
        reason: string,
    ): PubRecordEnrichProcedureEnrichFailedError {

        return new PubRecordEnrichProcedureEnrichFailedError(
            `Enrich procedure enrich failed due to: ${reason}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubRecordEnrichProcedureEnrichFailedError", reason);

        Object.setPrototypeOf(this, PubRecordEnrichProcedureEnrichFailedError.prototype);
    }
}
