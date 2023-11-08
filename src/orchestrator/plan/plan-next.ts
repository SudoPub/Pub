/**
 * @author WMXPY
 * @namespace Orchestrator_Plan
 * @description Plan Next
 */

import { PUB_PLAN_TYPE, PUB_TASK_TYPE, PubPlan } from "@sudopub/essential";
import { PubDriverTask } from "../../task/implementation/driver";
import { PubStartTask } from "../../task/implementation/start";
import { PubTaskBase } from "../../task/task-base";
import { PubTaskManager } from "../../task/task-manager";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";
import { planForNextOnDriverTask } from "./task/driver";
import { planForNextOnStartTask } from "./task/start";

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

        if (nextExecutableTask.taskType === PUB_TASK_TYPE.DRIVER) {

            nextPlans.push(
                ...planForNextOnDriverTask(
                    configuration,
                    taskManager,
                    nextExecutableTask as PubDriverTask,
                ),
            );
            continue task;
        }
        if (nextExecutableTask.taskType === PUB_TASK_TYPE.START) {

            nextPlans.push(
                ...planForNextOnStartTask(
                    configuration,
                    taskManager,
                    nextExecutableTask as PubStartTask,
                ),
            );
            continue task;
        }
    }
    return nextPlans;
};
