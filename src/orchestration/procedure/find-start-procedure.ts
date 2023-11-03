/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Start Procedure
 */

import { Optional } from "@sudoo/optional";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubRecordProcedureEnrich } from "../../record/definition/procedure-enrich";
import { PubRecord } from "../../record/record";

export const findStartEnrichedProcedure = (
    record: PubRecord,
): Optional<PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE.START>> => {

    const startProcedure: Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>> =
        findStartProcedure(record);

    if (!startProcedure.exists) {
        return Optional.ofEmpty();
    }

    const startEnrichedProcedure: Optional<PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE.START>> =
        Optional.ofAny(record
            .snapshot
            .procedureEnriches[startProcedure.getOrThrow().identifier]) as any as Optional<PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE.START>>;

    return startEnrichedProcedure;
};

export const findStartProcedure = (
    record: PubRecord,
): Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>> => {

    return Optional.ofAny(record
        .cachedConfiguration
        .configuration
        .procedures
        .find((procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE>) => {

            return procedure.type === PUB_PROCEDURE_TYPE.START;
        })) as any as Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>>;
};
