/**
 * @author WMXPY
 * @namespace Task_Resolve
 * @description Resolve
 */

import { PUB_TASK_TYPE } from "@sudopub/essential";
import { PubMapEspialTask } from "../implementation/map-espial";
import { PubTaskBase } from "../task-base";
import { PubTaskManager } from "../task-manager";
import { resolveMapEspialTask } from "./resolve-map-espial";

export const resolveResolvableTask = (
    task: PubTaskBase,
    taskManager: PubTaskManager,
): boolean => {

    switch (task.taskType) {

        case PUB_TASK_TYPE.MAP_ESPIAL: {
            return resolveMapEspialTask(
                task as PubMapEspialTask,
                taskManager,
            );
        }
    }
    return false;
};
