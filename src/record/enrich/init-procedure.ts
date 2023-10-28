/**
 * @author WMXPY
 * @namespace Record_Enrich
 * @description Init Procedure
 */

import { PubRecordEnrichProcedureEnrichFailedError } from "../../error/record/enrich/procedure-enrich-failed";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { generateIdentifier } from "../../util/identifier";
import { PubRecordProcedureEnrich, PubRecordProcedureEnrichCommon, PubRecordProcedureEnrichRecord } from "../definition/procedure-enrich";

export const recordInitEnrichProcedureRecord = (
    procedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>>,
): PubRecordProcedureEnrichRecord => {

    const record: PubRecordProcedureEnrichRecord = {};

    for (const procedure of procedures) {

        const enrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE> = recordInitEnrichProcedure(procedure);

        record[enrich.procedureIdentifier] = enrich;
    }
    return record;
};

export const recordInitEnrichProcedure = <T extends PUB_PROCEDURE_TYPE>(
    procedure: PubProcedureConfiguration<T>,
): PubRecordProcedureEnrich<T> => {

    const common: PubRecordProcedureEnrichCommon<T> = {
        procedureIdentifier: procedure.identifier,
        procedureType: procedure.type,
        enterWaypoint: generateIdentifier(),
    };

    switch (procedure.type) {

        case PUB_PROCEDURE_TYPE.START: return {
            ...common,
            exitWaypoint: generateIdentifier(),
        } as PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE.START> as any;

        case PUB_PROCEDURE_TYPE.END: return {
            ...common,
        } as PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE.END> as any;

        case PUB_PROCEDURE_TYPE.DRIVER: return {
            ...common,
            exitWaypoint: generateIdentifier(),
        } as PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE.DRIVER> as any;

        case PUB_PROCEDURE_TYPE.MAP: return {
            ...common,
            iterationStartWaypoint: generateIdentifier(),
            iterationEndWaypoint: generateIdentifier(),
            exitWaypoint: generateIdentifier(),
        } as PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE.MAP> as any;
    }

    throw PubRecordEnrichProcedureEnrichFailedError.create('unknown procedure type');
};
