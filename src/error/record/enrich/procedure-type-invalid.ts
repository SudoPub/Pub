/**
 * @author WMXPY
 * @namespace Error_Record_Enrich
 * @description Procedure Identifier Not Found During Enrich
 */

import { PubRecordEnrichError } from "./enrich-error";

export class PubRecordEnrichProcedureTypeInvalidError extends PubRecordEnrichError {

    public static create(
        identifier: string,
        shouldBeTypes: string[],
    ): PubRecordEnrichProcedureTypeInvalidError {

        return new PubRecordEnrichProcedureTypeInvalidError(
            `Enrich procedure type invalid during enrich due to: ${identifier} should be one of ${shouldBeTypes.join(', ')}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubRecordEnrichProcedureTypeInvalidError", reason);

        Object.setPrototypeOf(this, PubRecordEnrichProcedureTypeInvalidError.prototype);
    }
}
