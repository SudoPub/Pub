/**
 * @author WMXPY
 * @namespace Orchestration_Waypoint
 * @description Find Start Exit Waypoint
 */

import { Optional } from "@sudoo/optional";
import { PUB_PROCEDURE_TYPE } from "../../procedure/definition/configuration";
import { PubRecordProcedureEnrich } from "../../record/definition/procedure-enrich";
import { PubRecord } from "../../record/record";
import { findStartEnrichedProcedure } from "../procedure/find-start-procedure";

export const findStartExitWaypoint = (
    record: PubRecord,
): Optional<string> => {

    const firstProcedure: Optional<PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE.START>>
        = findStartEnrichedProcedure(record);

    if (firstProcedure.exists) {

        return Optional.of(
            firstProcedure.getOrThrow().exitWaypoint,
        );
    }

    return Optional.ofEmpty();
};
