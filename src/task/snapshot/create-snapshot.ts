/**
 * @author WMXPY
 * @namespace Task_Snapshot
 * @description Create Snapshot
 */

import { PubSnapshotTask } from "../../snapshot/task";
import { PubTaskBase } from "../task-base";

export const createTaskSnapshot = (
    task: PubTaskBase,
): PubSnapshotTask => {

    return {

        taskIdentifier: task.taskIdentifier,
        procedureIdentifier: task.procedure.identifier,

        type: task.taskType,

        dependencies: task.dependencies,

        status: task.taskStatus,
        input: task.getExecuteInput().getOrUndefined(),
        output: task.getExecuteOutput().getOrUndefined(),

        payload: task.serialize(),
    };
};
