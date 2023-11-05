/**
 * @author WMXPY
 * @namespace Plan
 * @description Create
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PUB_PLAN_TYPE, PubPlan, PubPlanPayloadSwitch } from "./definition/plan";

export const createPubPlan = <T extends PUB_PLAN_TYPE>(
    type: T,
    payload: PubPlanPayloadSwitch<T>,
): PubPlan<T> => {

    const identifier: string = UUIDVersion1.generateString();

    return {
        identifier,
        type,
        payload,
        timestamp: new Date(),
    };
};
