/**
 * @author WMXPY
 * @namespace Error_Record_Enrich
 * @description Procedure Identifier Not Found During Enrich
 */

import { PubRecordEnrichError } from "./enrich-error";

export class PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError extends PubRecordEnrichError {

    public static create(
        identifier: string,
    ): PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError {

        return new PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError(
            `Enrich procedure identifier not found during enrich due to: ${identifier}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError", reason);

        Object.setPrototypeOf(this, PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError.prototype);
    }
}
