/**
 * @author WMXPY
 * @namespace Task_Apply
 * @description Apply
 */

import { PUB_ACTION_TYPE, PubAction } from "@sudopub/essential";
import { PubTaskManager } from "../task-manager";
import { applyMapEspialSucceedOnTaskManager } from "./map-espial-succeed";
import { applyTaskResolveSucceedOnTaskManager } from "./task-resolve-succeed";

export const applyActionOnTaskManager = (
    action: PubAction,
    manager: PubTaskManager,
): boolean => {

    switch (action.type) {

        case PUB_ACTION_TYPE.MAP_ESPIAL_SUCCEED: {

            return applyMapEspialSucceedOnTaskManager(
                action as PubAction<PUB_ACTION_TYPE.MAP_ESPIAL_SUCCEED>,
                manager,
            );
        }
        case PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED: {

            return applyTaskResolveSucceedOnTaskManager(
                action as PubAction<PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED>,
                manager,
            );
        }
    }
    return false;
};
