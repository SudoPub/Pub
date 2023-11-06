/**
 * @author WMXPY
 * @namespace Orchestrator_Plan
 * @description Plan Next
 */

import { createPubPlan } from "../../plan/create";
import { PUB_PLAN_TYPE, PubPlan } from "../../plan/definition/plan";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PUB_TASK_TYPE } from "../../task/definition/task";
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

    const nextPlans: Array<PubPlan<PUB_PLAN_TYPE>> = [];
    task: for (const nextExecutableTask of nextExecutableTasks) {

        if (nextExecutableTask.taskType === PUB_TASK_TYPE.START) {

            nextPlans.push(createPubPlan(
                PUB_PLAN_TYPE.INITIAL_START,
                {
                    procedure: nextExecutableTask.procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>,
                },
            ));
            continue task;
        }
        if (nextExecutableTask.taskType === PUB_TASK_TYPE.DRIVER) {

            nextPlans.push(createPubPlan(
                PUB_PLAN_TYPE.EXECUTE_DRIVER,
                {
                    procedure: nextExecutableTask.procedure as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>,
                    input: nextExecutableTask.getExecuteInput().getOrThrow(),
                },
            ));
            continue task;
        }
    }
    return [];
};
