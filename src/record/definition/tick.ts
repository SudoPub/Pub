/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Tick
 */

export type PubWorkflowRecordTick =
    & PubWorkflowRecordTickCommon
    & PubWorkflowRecordTickSwitch;

export enum PUB_WORKFLOW_RECORD_TICK_TYPE {

    ESPIAL = "ESPIAL",
}

export type PubWorkflowRecordTickCommon = {

    readonly identifier: string;
    readonly timestamp: Date;
};

export type PubWorkflowRecordTickSwitch =
    | PubWorkflowRecordTickEspial;

export type PubWorkflowRecordTickEspial = {

    readonly type: PUB_WORKFLOW_RECORD_TICK_TYPE.ESPIAL;
    readonly espial: string;
};
