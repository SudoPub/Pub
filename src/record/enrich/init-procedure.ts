/**
 * @author WMXPY
 * @namespace Record_Enrich
 * @description Init Procedure
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubRecordProcedureEnrich, PubRecordProcedureEnrichMap } from "../definition/procedure-enrich";

export const recordInitEnrichProcedureMap = (
    procedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>>,
): PubRecordProcedureEnrichMap => {

    const map: PubRecordProcedureEnrichMap = new Map();

    for (const procedure of procedures) {
        const enrich: PubRecordProcedureEnrich = recordInitEnrichProcedure(procedure);
        map.set(enrich.procedureIdentifier, enrich);
    }
    return map;
};

export const recordInitEnrichProcedure = (
    procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE>,
): PubRecordProcedureEnrich => {

    return {

        procedureIdentifier: procedure.identifier,
    };
};
