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
    protected readonly _dependencies: string[];

    public abstract procedureIdentifier: string;

    protected constructor(
        type: PUB_TASK_TYPE,
        dependencies: string[],
    ) {

        this._taskIdentifier = UUIDVersion1.generateString();
        this._taskType = type;
        this._dependencies = dependencies;
    }

    public get taskIdentifier(): string {
        return this._taskIdentifier;
    }

    protected abstract serialize(): PubSerializedTask;
}
