/**
 * @author WMXPY
 * @namespace Definition
 * @description Action
 */

import { PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { TaskExecuteOutput } from "../../task/definition/task";

export enum PUB_ACTION_TYPE {

    INSERT_TASK_FROM_PROCEDURES = "INSERT_TASK_FROM_PROCEDURES",
    TASK_RESOLVE_SUCCEED = "TASK_RESOLVE_SUCCEED",
}

export type PubAction<T extends PUB_ACTION_TYPE = PUB_ACTION_TYPE> = {

    readonly identifier: string;
    readonly type: T;

    readonly payload: PubActionPayloadSwitch<T>;

    readonly timestamp: Date;
};

export type PubActionPayloadSwitch<T extends PUB_ACTION_TYPE> =
    T extends PUB_ACTION_TYPE.INSERT_TASK_FROM_PROCEDURES ? PubAction_InsertTaskFromProcedures :
    T extends PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED ? PubAction_TaskResolveSucceed :
    never;

export type PubAction_InsertTaskFromProcedures = {

    readonly reason: string;

    readonly procedures: PubProcedureConfiguration[];
};

export type PubAction_TaskResolveSucceed = {

    readonly taskIdentifier: string;

    readonly output: TaskExecuteOutput;
};
