/**
 * @author WMXPY
 * @namespace Task
 * @description Task Manager
 */

import { PubTaskBase } from "./task-base";

export class PubTaskManager {

    public static withTasks(
        tasks: PubTaskBase[],
    ): PubTaskManager {

        return new PubTaskManager(tasks);
    }

    private readonly _tasks: PubTaskBase[];

    private constructor(
        tasks: PubTaskBase[],
    ) {

        this._tasks = tasks;
    }
}
