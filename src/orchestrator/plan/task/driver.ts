/**
 * @author WMXPY
 * @namespace Orchestrator_Plan_Task
 * @description Driver
 */

import { createPubPlan } from "../../../plan/create";
import { PUB_PLAN_TYPE, PubPlan } from "../../../plan/definition/plan";
import { PubDriverTask } from "../../../task/implementation/driver";
import { PubTaskManager } from "../../../task/task-manager";
import { PubCachedWorkflowConfiguration } from "../../../workflow/cache/configuration";

export const planForNextOnDriverTask = (
    configuration: PubCachedWorkflowConfiguration,
    taskManager: PubTaskManager,
    task: PubDriverTask,
): Array<PubPlan<PUB_PLAN_TYPE>> => {

    return [
        createPubPlan(
            PUB_PLAN_TYPE.EXECUTE_DRIVER,
            task,
            {
                procedure: task.procedure,
                input: task.getExecuteInput().getOrThrow(),
            },
        ),
    ];
};
