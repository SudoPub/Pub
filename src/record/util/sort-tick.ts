/**
 * @author WMXPY
 * @namespace Record_Util
 * @description Sort Tick
 */

import { PUB_WORKFLOW_RECORD_TICK_TYPE, PubWorkflowRecordTick } from "../definition/tick";

export const sortPubTicks = (
    ticks: Array<PubWorkflowRecordTick<PUB_WORKFLOW_RECORD_TICK_TYPE>>,
): Array<PubWorkflowRecordTick<PUB_WORKFLOW_RECORD_TICK_TYPE>> => {

    return ticks.sort(
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
};
