/**
 * @author WMXPY
 * @namespace Definition
 * @description Plan
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { TaskExecuteInput } from "../../task/definition/task";

export enum PUB_PLAN_TYPE {

    EXECUTE_DRIVER = "EXECUTE_DRIVER",
    INITIAL_START = "INITIAL_START",
}

export type PubPlan<T extends PUB_PLAN_TYPE> = {

    readonly planIdentifier: string;
    readonly type: T;

    readonly taskIdentifier: string;
    readonly payload: PubPlanPayloadSwitch<T>;

    readonly timestamp: Date;
};

export type PubPlanPayloadSwitch<T extends PUB_PLAN_TYPE> =
    T extends PUB_PLAN_TYPE.EXECUTE_DRIVER ? PubPlan_ExecuteDriver :
    T extends PUB_PLAN_TYPE.INITIAL_START ? PubPlan_InitialStart :
    never;

export type PubPlan_ExecuteDriver = {

    readonly procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>;

    readonly input: TaskExecuteInput;
};

export type PubPlan_InitialStart = {

    readonly procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>;
};
