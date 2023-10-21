/**
 * @author WMXPY
 * @namespace Record_Enrich
 * @description Init Procedure
 */

import { PubRecordEnrichProcedureEnrichFailedError } from "../../error/record/enrich/procedure-enrich-failed";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { generateIdentifier } from "../../util/identifier";
import { PubRecordProcedureEnrich, PubRecordProcedureEnrichCommon, PubRecordProcedureEnrichMap } from "../definition/procedure-enrich";

export const recordInitEnrichProcedureMap = (
    procedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>>,
): PubRecordProcedureEnrichMap => {

    const map: PubRecordProcedureEnrichMap = new Map();

    for (const procedure of procedures) {

        const enrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE> = recordInitEnrichProcedure(procedure);

        map.set(enrich.procedureIdentifier, enrich);
    }
    return map;
};

export const recordInitEnrichProcedure = <T extends PUB_PROCEDURE_TYPE>(
    procedure: PubProcedureConfiguration<T>,
): PubRecordProcedureEnrich<T> => {

    const common: PubRecordProcedureEnrichCommon = {
        procedureIdentifier: procedure.identifier,
        enterWaypoint: generateIdentifier(),
    };

    switch (procedure.type) {

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
