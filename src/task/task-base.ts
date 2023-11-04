/**
 * @author WMXPY
 * @namespace Task
 * @description Task Base
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask } from "./definition/task";

export abstract class PubTaskBase {

    private readonly _taskIdentifier: string;
    private readonly _taskStatus: PUB_TASK_STATUS;
    private readonly _taskType: PUB_TASK_TYPE;

    private readonly _dependencies: Set<string>;

    public abstract procedureIdentifier: string;

    protected constructor(
        type: PUB_TASK_TYPE,
        dependencies: string[],
    ) {

        this._taskIdentifier = UUIDVersion1.generateString();
        this._taskStatus = PUB_TASK_STATUS.QUEUED;
        this._taskType = type;

        this._dependencies = new Set(dependencies);
    }

    public get taskIdentifier(): string {
        return this._taskIdentifier;
    }
    public get taskStatus(): PUB_TASK_STATUS {
        return this._taskStatus;
    }
    public get taskType(): PUB_TASK_TYPE {
        return this._taskType;
    }

    public get dependencies(): string[] {
        return [...this._dependencies];
    }

    public executable(): boolean {

        return this._dependencies.size === 0
            && this._taskStatus === PUB_TASK_STATUS.QUEUED;
    }

    public addDependency(dependency: string): this {

        this._dependencies.add(dependency);
        return this;
    }

    public removeDependency(dependency: string): this {

        this._dependencies.delete(dependency);
        return this;
    }

    protected abstract serialize(): PubSerializedTask;
}
