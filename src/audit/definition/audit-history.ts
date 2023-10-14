/**
 * @author WMXPY
 * @namespace Definition
 * @description Audit History
 */

import { PubExecuteParameters } from "../../orchestration/definition/execute";

export enum PUB_WORKFLOW_RECORD_TICK_TYPE {

    ESPIAL_TRIGGERED = "ESPIAL_TRIGGERED",
    EXECUTE_PARAMETERS = "EXECUTE_PARAMETERS",
}

export type PubAuditHistory<T extends PUB_WORKFLOW_RECORD_TICK_TYPE> = {

    readonly identifier: string;
    readonly type: T;

    readonly payload: PubAuditHistoryPayloadSwitch<T>;

    readonly timestamp: Date;
};

export type PubAuditHistoryPayloadSwitch<T extends PUB_WORKFLOW_RECORD_TICK_TYPE> =
    T extends PUB_WORKFLOW_RECORD_TICK_TYPE.ESPIAL_TRIGGERED ? PubAuditHistoryEspialTriggered :
    T extends PUB_WORKFLOW_RECORD_TICK_TYPE.EXECUTE_PARAMETERS ? PubAuditHistoryExecuteParameters :
    never;

export type PubAuditHistoryEspialTriggered = {

    readonly espial: string;
};

export type PubAuditHistoryExecuteParameters = {

    readonly parameters: PubExecuteParameters;
};
