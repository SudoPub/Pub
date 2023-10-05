/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Tick
 */

export type PubWorkflowRecordTick = {

    readonly identifier: string;
    readonly timestamp: Date;
    readonly status: string;
    readonly message?: string;
};
