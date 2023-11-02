/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Triggerable Procedures
 */

import { PUB_PROCEDURE_TYPE } from "../../procedure/definition/configuration";
import { PubRecordProcedureEnrich } from "../../record/definition/procedure-enrich";
import { PubRecord } from "../../record/record";

// TODO: implement this
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
