/**
 * @author WMXPY
 * @namespace Definition
 * @description Action
 */

import { TaskExecuteOutput } from "../../task/definition/task";
import { PubAction_MapEspialSucceed } from "./map-espial-succeed";

export enum PUB_ACTION_TYPE {

    MAP_ESPIAL_SUCCEED = "MAP_ESPIAL_SUCCEED",
    TASK_RESOLVE_SUCCEED = "TASK_RESOLVE_SUCCEED",
}

export type PubAction<T extends PUB_ACTION_TYPE = PUB_ACTION_TYPE> = {

    readonly identifier: string;
    readonly type: T;

    readonly payload: PubActionPayloadSwitch<T>;

    readonly timestamp: Date;
};

export type PubActionPayloadSwitch<T extends PUB_ACTION_TYPE> =
    T extends PUB_ACTION_TYPE.MAP_ESPIAL_SUCCEED ? PubAction_MapEspialSucceed :
    T extends PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED ? PubAction_TaskResolveSucceed :
    never;

export type PubAction_TaskResolveSucceed = {

    readonly taskIdentifier: string;

    readonly output: TaskExecuteOutput;
};
