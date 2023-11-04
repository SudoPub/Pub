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

export type PubSerializedTask = Record<string, any>;
