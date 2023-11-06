/**
 * @author WMXPY
 * @namespace Orchestrator_Plan
 * @description Plan Next
 */

import { PUB_PLAN_TYPE, PubPlan } from "../../plan/definition/plan";
import { PubTaskBase } from "../../task/task-base";
import { PubTaskManager } from "../../task/task-manager";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";

export const planForNext = (
    configuration: PubCachedWorkflowConfiguration,
    taskManager: PubTaskManager,
): Array<PubPlan<PUB_PLAN_TYPE>> => {

    const nextExecutableTasks: PubTaskBase[] = taskManager.getExecutableTasks();

    if (nextExecutableTasks.length === 0) {
        return [];
    }

    return [];
};
