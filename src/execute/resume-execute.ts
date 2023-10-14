/**
 * @author WMXPY
 * @namespace Execute
 * @description Resume Execute
 */

import { OrchestrationResourceManager } from "../orchestration/resource/manager";
import { PubRecordProjection } from "../record/definition/projection";
import { PubRecord } from "../record/record";

export const resumeExecute = async (
    record: PubRecord,
    _resourceManager: OrchestrationResourceManager,
): Promise<PubRecord> => {

    const projections: PubRecordProjection[] = record.projections;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const projection of projections) {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const dependencyProcedures = [];
    }

    return record;
};
