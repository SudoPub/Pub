/**
 * @author WMXPY
 * @namespace Record_Loop
 * @description Walk Through
 */

import { PUB_WORKFLOW_RECORD_TICK_TYPE, PubWorkflowRecordTick, PubWorkflowRecordTickExecuteParameters } from "../definition/tick";
import { PubRecord } from "../record";
import { PubRecordSnapshot } from "../snapshot/snapshot";
import { sortPubTicks } from "../util/sort-tick";

export const walkThroughRecord = (
    record: PubRecord,
): PubRecordSnapshot => {

    const snapshot: PubRecordSnapshot = PubRecordSnapshot.fromScratch();

    const ticks: Array<PubWorkflowRecordTick<PUB_WORKFLOW_RECORD_TICK_TYPE>>
        = sortPubTicks(record.ticks);

    for (const tick of ticks) {

        switch (tick.type) {

            case PUB_WORKFLOW_RECORD_TICK_TYPE.EXECUTE_PARAMETERS: {

                const payload: PubWorkflowRecordTickExecuteParameters
                    = tick.payload as PubWorkflowRecordTickExecuteParameters;

                snapshot.setStartParameters(payload.parameters);
                break;
            }
        }
    }

    return snapshot;
};
