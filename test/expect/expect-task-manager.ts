/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Task Manager
 * @override Expect
 */

import { PubTaskManager } from '../../src/task/task-manager';

export class ExpectTaskManager {

    public static with(
        taskManager: PubTaskManager,
    ): ExpectTaskManager {

        return new ExpectTaskManager(taskManager);
    }

    private readonly _taskManager: PubTaskManager;

    private constructor(
        taskManager: PubTaskManager,
    ) {

        this._taskManager = taskManager;
    }
}
