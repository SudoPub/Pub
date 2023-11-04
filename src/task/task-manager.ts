/**
 * @author WMXPY
 * @namespace Task
 * @description Task Manager
 */

import { Optional } from "@sudoo/optional";
import { PubAction } from "../action/definition/action";
import { IPubTaskManager } from "./definition/task-manager";
import { PubTaskBase } from "./task-base";

export class PubTaskManager implements IPubTaskManager {

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

    public get tasks(): PubTaskBase[] {
        return this._tasks;
    }

    public getTaskByIdentifier(identifier: string): Optional<PubTaskBase> {

        for (const task of this._tasks) {
            if (task.taskIdentifier === identifier) {
                return Optional.ofAny(task);
            }
        }
        return Optional.ofEmpty();
    }

    public getTasksByDependency(dependencyIdentifier: string): PubTaskBase[] {

        return this._tasks.filter(
            (task: PubTaskBase) => {
                return task.dependencies.includes(dependencyIdentifier);
            },
        );
    }

    public getExecutableTasks(): PubTaskBase[] {

        return this._tasks.filter(
            (task: PubTaskBase) => {
                return task.executable();
            },
        );
    }

    public applyAction(_action: PubAction): this {

        return this;
    }
}
