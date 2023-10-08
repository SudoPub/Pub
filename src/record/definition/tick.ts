/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Tick
 */

import { PubExecuteParameters } from "../../orchestration/definition/execute";

export enum PUB_WORKFLOW_RECORD_TICK_TYPE {

    ESPIAL_TRIGGERED = "ESPIAL_TRIGGERED",
    EXECUTE_PARAMETERS = "EXECUTE_PARAMETERS",
}

export type PubWorkflowRecordTick<T extends PUB_WORKFLOW_RECORD_TICK_TYPE> = {


    readonly identifier: string;
    readonly type: T;

    readonly payload: PubWorkflowRecordTickPayloadSwitch<T>;

    readonly timestamp: Date;
};

export type PubWorkflowRecordTickPayloadSwitch<T extends PUB_WORKFLOW_RECORD_TICK_TYPE> =
    T extends PUB_WORKFLOW_RECORD_TICK_TYPE.ESPIAL_TRIGGERED ? PubWorkflowRecordTickEspialTriggered :
    T extends PUB_WORKFLOW_RECORD_TICK_TYPE.EXECUTE_PARAMETERS ? PubWorkflowRecordTickExecuteParameters :
    never;

export type PubWorkflowRecordTickEspialTriggered = {

    readonly espial: string;
};

export type PubWorkflowRecordTickExecuteParameters = {

    readonly parameters: PubExecuteParameters;
};
