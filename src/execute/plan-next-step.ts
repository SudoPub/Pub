/**
 * @author WMXPY
 * @namespace Execute
 * @description Plan Next Step
 */

import { PubRecordSnapshot } from "../record/snapshot/snapshot";
import { PubCachedWorkflowConfiguration } from "../workflow/cache/configuration";

export type ExecutePlanNextStepResult = {

    // readonly nextStep: ExecuteStep;
};

export const executePlanNextStep = (
    _cachedConfiguration: PubCachedWorkflowConfiguration,
    _snapshot: PubRecordSnapshot,
): ExecutePlanNextStepResult => {

    return {};
};
