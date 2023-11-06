/**
 * @author WMXPY
 * @namespace Task_Resolve
 * @description Resolve Map Espial
 */

import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { TaskExecuteInput } from "../definition/task";
import { PubMapEspialTask } from "../implementation/map-espial";
import { PubTaskManager } from "../task-manager";

export const resolveMapEspialTask = (
    task: PubMapEspialTask,
    _manager: PubTaskManager,
): boolean => {

    const procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP> = task.procedure;
    const executeInput: TaskExecuteInput = task
        .getExecuteInput()
        .getOrDefault({});

    if (!Array.isArray(
        executeInput[procedure.payload.iterationParameter]
    )) {
        return false;
    }

    const items: any[] = executeInput[procedure.payload.iterationParameter];

    console.log(items);

    return true;
};
