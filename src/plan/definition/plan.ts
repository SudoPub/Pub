/**
 * @author WMXPY
 * @namespace Definition
 * @description Plan
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { TaskExecuteInput } from "../../task/definition/task";

export enum PUB_PLAN_TYPE {

    EXECUTE_DRIVER = "EXECUTE_DRIVER",
}

export type PubPlan<T extends PUB_PLAN_TYPE> = {

    readonly identifier: string;
    readonly type: T;

    readonly payload: PubPlanPayloadSwitch<T>;

    readonly timestamp: Date;
};

export type PubPlanPayloadSwitch<T extends PUB_PLAN_TYPE> =
    T extends PUB_PLAN_TYPE.EXECUTE_DRIVER ? PubPlan_ExecuteDriver :
    never;

export type PubPlan_ExecuteDriver = {

    readonly procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.DRIVER>;

    readonly input: TaskExecuteInput;
};
