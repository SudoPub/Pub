/**
 * @author WMXPY
 * @namespace Task_Definition
 * @description Task
 */

export enum PUB_TASK_TYPE {

    MAP = "MAP",
    DRIVER = "DRIVER",
    FINALIZE = "FINALIZE",
}

export enum PUB_TASK_STATUS {

    QUEUED = "QUEUED",
}

export type PubSerializedTask = Record<string, any>;

export type TaskExecuteInput = Record<string, any>;
export type TaskExecuteOutput = Record<string, any>;
