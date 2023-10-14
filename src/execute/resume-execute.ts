/**
 * @author WMXPY
 * @namespace Execute
 * @description Resume Execute
 */

import { OrchestrationResourceManager } from "../orchestration/resource/manager";
import { walkThroughRecord } from "../record/loop/walk-through";
import { PubRecord } from "../record/record";
import { PubRecordSnapshot } from "../record/snapshot/snapshot";

export const resumeExecute = async (
    record: PubRecord,
    _resourceManager: OrchestrationResourceManager,
): Promise<PubRecord> => {

    const snapshot: PubRecordSnapshot = walkThroughRecord(record);

    console.log(snapshot.serialize());

    return record;
};
