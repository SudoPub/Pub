/**
 * @author WMXPY
 * @namespace Definition
 * @description Map Espial Succeed
 */

import { PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { TaskExecuteInput } from "../../task/definition/task";

export type PubAction_MapEspialSucceed_Iteration = {

    readonly connection: PubConnectionConfiguration;
    readonly procedure: PubProcedureConfiguration;
};

export type PubAction_MapEspialSucceed = {

    readonly taskIdentifier: string;

    readonly iterations: PubAction_MapEspialSucceed_Iteration[];
    readonly input: TaskExecuteInput;
};
