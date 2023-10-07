/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Tick
 */

export type PubWorkflowRecordTick =
    & PubWorkflowRecordTickCommon
    & PubWorkflowRecordTickSwitch;

export enum PUB_WORKFLOW_RECORD_TICK_TYPE {

    ESPIAL_TRIGGERED = "ESPIAL_TRIGGERED",
}

export type PubWorkflowRecordTickCommon = {

    readonly identifier: string;
    readonly timestamp: Date;
};

export type PubWorkflowRecordTickSwitch =
    | PubWorkflowRecordTickEspialTriggered;

export type PubWorkflowRecordTickEspialTriggered = {

    readonly type: PUB_WORKFLOW_RECORD_TICK_TYPE.ESPIAL_TRIGGERED;
    readonly espial: string;
};
