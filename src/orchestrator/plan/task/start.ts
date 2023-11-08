/**
 * @author WMXPY
 * @namespace Orchestrator_Plan_Task
 * @description Start
 */

import { PUB_PLAN_TYPE, PubPlan, createPubPlan } from "@sudopub/essential";
import { PubStartTask } from "../../../task/implementation/start";
import { PubTaskManager } from "../../../task/task-manager";
import { PubCachedWorkflowConfiguration } from "../../../workflow/cache/configuration";

export const planForNextOnStartTask = (
    configuration: PubCachedWorkflowConfiguration,
    taskManager: PubTaskManager,
    task: PubStartTask,
): Array<PubPlan<PUB_PLAN_TYPE>> => {

    return [
        createPubPlan(
            PUB_PLAN_TYPE.INITIAL_START,
            task.taskIdentifier,
            {
                procedure: task.procedure,
            },
        ),
    ];
};
