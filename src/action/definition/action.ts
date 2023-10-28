/**
 * @author WMXPY
 * @namespace Definition
 * @description Action
 */

import { PubExecuteParameters } from "../../execute/definition/execute";

export enum PUB_ACTION_TYPE {

    ESPIAL_TRIGGERED = "ESPIAL_TRIGGERED",
    EXECUTE_PARAMETERS = "EXECUTE_PARAMETERS",
}

export type PubAction<T extends PUB_ACTION_TYPE> = {

    readonly identifier: string;
    readonly type: T;

    readonly payload: PubActionPayloadSwitch<T>;

    readonly timestamp: Date;
};

export type PubActionPayloadSwitch<T extends PUB_ACTION_TYPE> =
    T extends PUB_ACTION_TYPE.ESPIAL_TRIGGERED ? PubActionEspialTriggered :
    T extends PUB_ACTION_TYPE.EXECUTE_PARAMETERS ? PubActionExecuteParameters :
    never;

export type PubActionEspialTriggered = {

    readonly espial: string;
};

export type PubActionExecuteParameters = {

    readonly parameters: PubExecuteParameters;
};
