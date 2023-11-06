/**
 * @author WMXPY
 * @namespace Task_Definition
 * @description Task
 */

export enum PUB_TASK_TYPE {

    DRIVER = "DRIVER",
    FINALIZE = "FINALIZE",
    MAP_ESPIAL = "MAP_ESPIAL",
    START = "START",
}

export enum PUB_TASK_STATUS {

    QUEUED = "QUEUED",
    AWAIT_DEPENDENCY = "AWAIT_DEPENDENCY",
    RESOLVED = "RESOLVED",
}

export type PubSerializedTask = Record<string, any>;

export type TaskExecuteInput = Record<string, any>;
export type TaskExecuteOutput = Record<string, any>;
