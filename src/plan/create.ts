/**
 * @author WMXPY
 * @namespace Plan
 * @description Create
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PubTaskBase } from "../task/task-base";
import { PUB_PLAN_TYPE, PubPlan, PubPlanPayloadSwitch } from "./definition/plan";

export const createPubPlan = <T extends PUB_PLAN_TYPE>(
    type: T,
    task: PubTaskBase,
    payload: PubPlanPayloadSwitch<T>,
): PubPlan<T> => {

    const identifier: string = UUIDVersion1.generateString();

    return {
        identifier,
        taskIdentifier: task.taskIdentifier,
        type,
        payload,
        timestamp: new Date(),
    };
};
