/**
 * @author WMXPY
 * @namespace Task
 * @description Task Base
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PUB_TASK_TYPE, PubSerializedTask } from "./definition/task";

export abstract class PubTaskBase {

    protected readonly _taskIdentifier: string;
    protected readonly _taskType: PUB_TASK_TYPE;
    protected readonly _dependencies: Set<string>;

    public abstract procedureIdentifier: string;

    protected constructor(
        type: PUB_TASK_TYPE,
        dependencies: string[],
    ) {

        this._taskIdentifier = UUIDVersion1.generateString();
        this._taskType = type;
        this._dependencies = new Set(dependencies);
    }

    public get taskIdentifier(): string {
        return this._taskIdentifier;
    }
    public get taskType(): PUB_TASK_TYPE {
        return this._taskType;
    }
    public get dependencies(): string[] {
        return [...this._dependencies];
    }

    protected abstract serialize(): PubSerializedTask;
}
