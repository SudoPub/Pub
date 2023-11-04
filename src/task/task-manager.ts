/**
 * @author WMXPY
 * @namespace Task
 * @description Task Manager
 */

import { Optional } from "@sudoo/optional";
import { PubSnapshot } from "../snapshot/snapshot";
import { PubTaskBase } from "./task-base";
import { createTaskSnapshot } from "./snapshot/create-snapshot";

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

    public getTasksByProcedureIdentifier(procedureIdentifier: string): PubTaskBase[] {

        console.log(procedureIdentifier, this.createSnapshot());

        return this._tasks.filter(
            (task: PubTaskBase) => {
                return task.procedureIdentifier === procedureIdentifier;
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

    public createSnapshot(): PubSnapshot {

        return {
            tasks: this._tasks.map((task: PubTaskBase) => {
                return createTaskSnapshot(task);
            }),
        };
    }
}
