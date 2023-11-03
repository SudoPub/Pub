/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Triggerable Procedures
 */

import { Optional } from "@sudoo/optional";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubRecordProcedureEnrich } from "../../record/definition/procedure-enrich";
import { PubRecord } from "../../record/record";

export const findTriggerableProcedures = (
    record: PubRecord,
    waypoint: string,
): Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> => {

    const procedureEnriches: Array<PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>> =
        findTriggerableProcedureEnriches(record, waypoint);

    const procedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> =
        procedureEnriches
            .map((procedureEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>) => {
                return procedureEnrich.procedureIdentifier;
            })
            .map((procedureIdentifier: string) => {
                return record.cachedConfiguration.getProcedureByIdentifier(procedureIdentifier);
            })
            .filter((possibleProcedure: Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>>) => {
                return possibleProcedure.exists;
            })
            .map((possibleProcedure) => {
                return possibleProcedure.getOrThrow();
            });

    return procedures;
};

export const findTriggerableProcedureEnriches = (
    record: PubRecord,
    waypoint: string,
): Array<PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>> => {

    const procedureEnriches: Array<PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>> =
        Object.values(record.snapshot.procedureEnriches)
            .filter((procedureEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>) => {
                return procedureEnrich.enterWaypoint === waypoint;
            });

    return procedureEnriches;
};
