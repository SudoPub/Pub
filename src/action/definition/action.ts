/**
 * @author WMXPY
 * @namespace Definition
 * @description Action
 */

import { TaskExecuteOutput } from "../../task/definition/task";

export enum PUB_ACTION_TYPE {

    ESPIAL_TRIGGERED = "ESPIAL_TRIGGERED",
    TASK_RESOLVE_SUCCEED = "TASK_RESOLVE_SUCCEED",
}

export type PubAction<T extends PUB_ACTION_TYPE = PUB_ACTION_TYPE> = {

    readonly identifier: string;
    readonly type: T;

    readonly payload: PubActionPayloadSwitch<T>;

    readonly timestamp: Date;
};

export type PubActionPayloadSwitch<T extends PUB_ACTION_TYPE> =
    T extends PUB_ACTION_TYPE.ESPIAL_TRIGGERED ? PubActionEspialTriggered :
    T extends PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED ? PubAction_TaskResolveSucceed :
    never;

export type PubActionEspialTriggered = {

    readonly espial: string;
};

export type PubAction_TaskResolveSucceed = {

    readonly taskIdentifier: string;

    readonly output: TaskExecuteOutput;
};
