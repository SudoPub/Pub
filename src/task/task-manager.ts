/**
 * @author WMXPY
 * @namespace Task
 * @description Task Manager
 */

import { Optional } from "@sudoo/optional";
import { PubSnapshot } from "@sudopub/essential";
import { PubCachedWorkflowConfiguration } from "../workflow/cache/configuration";
import { createPubTaskFromSnapshotTask } from "./factory/from-snapshot-task";
import { createTaskSnapshot } from "./snapshot/create-snapshot";
import { PubTaskBase } from "./task-base";

export class PubTaskManager {

    public static withTasks(
        tasks: PubTaskBase[],
        workflowConfiguration: PubCachedWorkflowConfiguration,
    ): PubTaskManager {

        return new PubTaskManager(tasks, workflowConfiguration);
    }

    public static withSnapshot(
        snapshot: PubSnapshot,
        workflowConfiguration: PubCachedWorkflowConfiguration,
    ): PubTaskManager {

        const tasks: PubTaskBase[] = snapshot.tasks.map((taskSnapshot) => {
            return createPubTaskFromSnapshotTask(
                taskSnapshot,
                workflowConfiguration,
            );
        });
        return new PubTaskManager(tasks, workflowConfiguration);
    }

    private readonly _tasks: PubTaskBase[];
    private readonly _workflowConfiguration: PubCachedWorkflowConfiguration;

    private constructor(
        tasks: PubTaskBase[],
        workflowConfiguration: PubCachedWorkflowConfiguration,
    ) {

        this._tasks = tasks;
        this._workflowConfiguration = workflowConfiguration;
    }

    public get tasks(): PubTaskBase[] {
        return this._tasks;
    }
    public get workflowConfiguration(): PubCachedWorkflowConfiguration {
        return this._workflowConfiguration;
    }

    public insertTasks(tasks: PubTaskBase[]): this {

        this._tasks.push(...tasks);
        return this;
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

        return this._tasks.filter(
            (task: PubTaskBase) => {
                return task.procedure.identifier === procedureIdentifier;
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

    public getResolvableTasks(): PubTaskBase[] {

        return this._tasks.filter(
            (task: PubTaskBase) => {
                return task.resolvable();
            },
        );
    }

    public createSnapshot(): PubSnapshot {

        return {

            configuration: this._workflowConfiguration.configuration,

            tasks: this._tasks.map((task: PubTaskBase) => {
                return createTaskSnapshot(task);
            }),
        };
    }
}
