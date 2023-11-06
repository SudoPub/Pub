/**
 * @author WMXPY
 * @namespace Orchestrator_Plan_Task
 * @description Start
 */

import { createPubPlan } from "../../../plan/create";
import { PUB_PLAN_TYPE, PubPlan } from "../../../plan/definition/plan";
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
            task,
            {
                procedure: task.procedure,
            },
        ),
    ];
};
