/**
 * @author WMXPY
 * @namespace Execute
 * @description Resume Execute
 */

import { OrchestrationResourceManager } from "../orchestration/resource/manager";
import { PubRecord } from "../record/record";

export const resumeExecute = async (
    record: PubRecord,
    _resourceManager: OrchestrationResourceManager,
): Promise<PubRecord> => {

    return record;
};
