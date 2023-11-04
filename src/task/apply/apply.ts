/**
 * @author WMXPY
 * @namespace Task_Apply
 * @description Apply
 */

import { PUB_ACTION_TYPE, PubAction } from "../../action/definition/action";
import { IPubTaskManager } from "../definition/task-manager";
import { applyTaskResolveSucceedOnTaskManager } from "./task-resolve-succeed";

export const applyActionOnTaskManager = (
    action: PubAction,
    manager: IPubTaskManager,
): void => {

    switch (action.type) {

        case PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED: {

            return applyTaskResolveSucceedOnTaskManager(
                action as PubAction<PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED>,
                manager,
            );
        }
    }
};
