/**
 * @author WMXPY
 * @namespace Task_Definition
 * @description Task
 */

export enum PUB_TASK_TYPE {

    MAP_ESPIAL = "MAP_ESPIAL",
    DRIVER = "DRIVER",
    FINALIZE = "FINALIZE",
}

export enum PUB_TASK_STATUS {

    QUEUED = "QUEUED",
    RESOLVED = "RESOLVED",
}

export type PubSerializedTask = Record<string, any>;

export type TaskExecuteInput = Record<string, any>;
export type TaskExecuteOutput = Record<string, any>;
