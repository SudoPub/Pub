/**
 * @author WMXPY
 * @namespace Action
 * @description Create
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PUB_ACTION_TYPE, PubAction, PubActionPayloadSwitch } from "./definition/action";

export const createPubAction = <T extends PUB_ACTION_TYPE>(
    type: T,
    payload: PubActionPayloadSwitch<T>,
): PubAction<T> => {

    const identifier: string = UUIDVersion1.generateString();

    return {
        identifier,
        type,
        payload,
        timestamp: new Date(),
    };
};
