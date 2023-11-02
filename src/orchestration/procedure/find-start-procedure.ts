/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Start Procedure
 */

import { Optional } from "@sudoo/optional";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubRecordProcedureEnrichRecord } from "../../record/definition/procedure-enrich";
import { PubRecord } from "../../record/record";

export const findStartEnrichedProcedure = (
    record: PubRecord,
): Optional<PubRecordProcedureEnrichRecord> => {

    const startProcedure: Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> =
        findStartProcedure(record);

    if (!startProcedure.exists) {
        return Optional.ofEmpty();
    }

    const startEnrichedProcedure: Optional<PubRecordProcedureEnrichRecord> =
        Optional.of(record
            .snapshot
            .procedureEnriches[startProcedure.getOrThrow().identifier]);

    return startEnrichedProcedure;
};

export const findStartProcedure = (
    record: PubRecord,
): Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> => {

    return Optional.of(record
        .cachedConfiguration
        .configuration
        .procedures
        .find((procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE>) => {

            return procedure.type === PUB_PROCEDURE_TYPE.START;
        }));
};
