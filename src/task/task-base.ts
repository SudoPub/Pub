/**
 * @author WMXPY
 * @namespace Task
 * @description Task Base
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { IPubTask } from "./definition/task";

export abstract class PubTaskBase implements IPubTask {

    protected readonly _taskIdentifier: string;

    public abstract procedureIdentifier: string;

    protected constructor() {

        this._taskIdentifier = UUIDVersion1.generateString();
    }

    public get taskIdentifier(): string {
        return this._taskIdentifier;
    }
}
