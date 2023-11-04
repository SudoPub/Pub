/**
 * @author WMXPY
 * @namespace Task
 * @description Task Base
 */

import { EmptyValueSymbol, SEmptyValue } from "@sudoo/symbol";
import { UUIDVersion1 } from "@sudoo/uuid";
import { PubTaskEnsureEmptyInputTypeError } from "../error/task/ensure/empty-input";
import { PubTaskEnsureEmptyOutputTypeError } from "../error/task/ensure/empty-output";
import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask, TaskExecuteInput, TaskExecuteOutput } from "./definition/task";
import { Optional } from "@sudoo/optional";

export abstract class PubTaskBase {

    private readonly _taskIdentifier: string;
    private readonly _taskType: PUB_TASK_TYPE;

    private readonly _dependencies: Set<string>;

    private _taskStatus: PUB_TASK_STATUS;
    private _executeInput: TaskExecuteInput | SEmptyValue;
    private _executeOutput: TaskExecuteOutput | SEmptyValue;

    public abstract procedureIdentifier: string;

    protected constructor(
        type: PUB_TASK_TYPE,
        dependencies: string[],
    ) {

        this._taskIdentifier = UUIDVersion1.generateString();
        this._taskType = type;

        this._dependencies = new Set(dependencies);

        this._taskStatus = PUB_TASK_STATUS.QUEUED;
        this._executeInput = EmptyValueSymbol;
        this._executeOutput = EmptyValueSymbol;
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

    public setTaskStatus(status: PUB_TASK_STATUS): this {

        this._taskStatus = status;
        return this;
    }

    public addDependency(dependency: string): this {

        this._dependencies.add(dependency);
        return this;
    }

    public removeDependency(dependency: string): this {

        this._dependencies.delete(dependency);
        return this;
    }

    public getExecuteInput(): Optional<TaskExecuteInput> {

        if (this._executeInput === EmptyValueSymbol) {
            return Optional.ofEmpty();
        }
        return Optional.ofAny(this._executeInput);
    }

    public ensureInput(): TaskExecuteInput {

        if (this._executeInput === EmptyValueSymbol) {
            throw PubTaskEnsureEmptyInputTypeError.withTaskIdentifier(
                this._taskIdentifier,
            );
        }
        return this._executeInput;
    }

    public combineExecuteInput(input: TaskExecuteInput): this {

        this._executeInput = {
            ...(this._executeInput === EmptyValueSymbol ? {} : this._executeInput),
            ...input,
        };
        return this;
    }

    public getExecuteOutput(): Optional<TaskExecuteOutput> {

        if (this._executeOutput === EmptyValueSymbol) {
            return Optional.ofEmpty();
        }
        return Optional.ofAny(this._executeOutput);
    }

    public ensureOutput(): TaskExecuteOutput {

        if (this._executeOutput === EmptyValueSymbol) {
            throw PubTaskEnsureEmptyOutputTypeError.withTaskIdentifier(
                this._taskIdentifier,
            );
        }
        return this._executeOutput;
    }

    public combineExecuteOutput(output: TaskExecuteOutput): this {

        this._executeOutput = {
            ...(this._executeOutput === EmptyValueSymbol ? {} : this._executeOutput),
            ...output,
        };
        return this;
    }

    public abstract serialize(): PubSerializedTask;
}
