/**
 * @author WMXPY
 * @namespace Snapshot
 * @description Task
 */

import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask, TaskExecuteInput, TaskExecuteOutput } from "../task/definition/task";

export type PubSnapshotTask = {

    readonly taskIdentifier: string;
    readonly procedureIdentifier: string;

    readonly type: PUB_TASK_TYPE;

    readonly dependencies: string[];

    readonly status: PUB_TASK_STATUS;
    readonly input?: TaskExecuteInput;
    readonly output?: TaskExecuteOutput;

    readonly payload: PubSerializedTask;
};
