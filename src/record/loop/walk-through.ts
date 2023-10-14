/**
 * @author WMXPY
 * @namespace Record_Loop
 * @description Walk Through
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_WORKFLOW_RECORD_TICK_TYPE, PubWorkflowRecordTick, PubWorkflowRecordTickExecuteParameters } from "../definition/tick";
import { PubRecord } from "../record";
import { PubRecordSnapshot } from "../snapshot/snapshot";

export const walkThroughRecord = (
    record: PubRecord,
): PubRecordSnapshot => {

    const snapshot: PubRecordSnapshot = PubRecordSnapshot.fromScratch();

    const ticks: Array<PubWorkflowRecordTick<PUB_WORKFLOW_RECORD_TICK_TYPE>>
        = record.ticks.sort(
            (
                a: PubWorkflowRecordTick<PUB_WORKFLOW_RECORD_TICK_TYPE>,
                b: PubWorkflowRecordTick<PUB_WORKFLOW_RECORD_TICK_TYPE>,
            ) => {

                const aTimestamp: number = a.timestamp.getTime();
                const bTimestamp: number = b.timestamp.getTime();

                if (aTimestamp > bTimestamp) {
                    return 1;
                }
                if (aTimestamp < bTimestamp) {
                    return -1;
                }
                return 0;
            },
        );

    for (const tick of ticks) {

        switch (tick.type) {

            case PUB_WORKFLOW_RECORD_TICK_TYPE.EXECUTE_PARAMETERS: {

                const payload: PubWorkflowRecordTickExecuteParameters
                    = tick.payload as PubWorkflowRecordTickExecuteParameters;

                snapshot.setCurrentParameters(payload.parameters);
                break;
            }
        }
    }

    if (snapshot.nextProcedure === null) {

        const firstProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE> | null
            = null;

        if (!firstProcedure) {

            throw new Error('[Sudoo-Workflow] No Start Procedure');
        }

        snapshot.setNextProcedure(firstProcedure);
    }

    return snapshot;
};
