/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Tick
 */

import { PubExecuteParameters } from "../../orchestration/definition/execute";

export type PubWorkflowRecordTick =
    & PubWorkflowRecordTickCommon
    & PubWorkflowRecordTickSwitch;

export enum PUB_WORKFLOW_RECORD_TICK_TYPE {

    ESPIAL_TRIGGERED = "ESPIAL_TRIGGERED",
    EXECUTE_PARAMETERS = "EXECUTE_PARAMETERS",
}

export type PubWorkflowRecordTickCommon = {

    readonly identifier: string;
    readonly timestamp: Date;
};

export type PubWorkflowRecordTickSwitch =
    | PubWorkflowRecordTickEspialTriggered
    | PubWorkflowRecordTickExecuteParameters;

export type PubWorkflowRecordTickEspialTriggered = {

    readonly type: PUB_WORKFLOW_RECORD_TICK_TYPE.ESPIAL_TRIGGERED;
    readonly espial: string;
};

export type PubWorkflowRecordTickExecuteParameters = {

    readonly type: PUB_WORKFLOW_RECORD_TICK_TYPE.EXECUTE_PARAMETERS;
    readonly parameters: PubExecuteParameters;
};
