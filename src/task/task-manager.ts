/**
 * @author WMXPY
 * @namespace Task
 * @description Task Manager
 */

import { PubAction } from "../action/definition/action";
import { PUB_TASK_STATUS } from "./definition/task";
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

    public getExecutableTasks(): PubTaskBase[] {

        return this._tasks.filter(
            (task: PubTaskBase) => {
                return task.dependencies.length === 0
                    && task.taskStatus === PUB_TASK_STATUS.QUEUED;
            },
        );
    }

    public applyAction(_action: PubAction): this {

        return this;
    }
}
