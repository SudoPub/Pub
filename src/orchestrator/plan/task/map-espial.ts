/**
 * @author WMXPY
 * @namespace Orchestrator_Plan_Task
 * @description Map Espial
 */

import { PUB_PLAN_TYPE, PubPlan } from "@sudopub/essential";
import { PubMapEspialTask } from "../../../task/implementation/map-espial";
import { PubTaskManager } from "../../../task/task-manager";
import { PubCachedWorkflowConfiguration } from "../../../workflow/cache/configuration";

export const planForNextOnMapEspialTask = (
    _configuration: PubCachedWorkflowConfiguration,
    _taskManager: PubTaskManager,
    _task: PubMapEspialTask,
): Array<PubPlan<PUB_PLAN_TYPE>> => {

    return [];
};
