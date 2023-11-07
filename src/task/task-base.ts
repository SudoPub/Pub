/**
 * @author WMXPY
 * @namespace Task
 * @description Task Base
 */

import { Optional } from "@sudoo/optional";
import { EmptyValueSymbol, SEmptyValue } from "@sudoo/symbol";
import { UUIDVersion1 } from "@sudoo/uuid";
import { PubConnectionParameterMapping } from "../connection/definition/configuration";
import { PubTaskEnsureEmptyInputTypeError } from "../error/task/ensure/empty-input";
import { PubTaskEnsureEmptyOutputTypeError } from "../error/task/ensure/empty-output";
import { PubProcedureConfiguration } from "../procedure/definition/configuration";
import { PUB_TASK_STATUS, PUB_TASK_TYPE, PubSerializedTask, TaskExecuteInput, TaskExecuteOutput } from "./definition/task";
import { mapTaskDependencyOutput } from "./mapping/map-output";
import { validateFullProcedureInput } from "./mapping/validate-full-procedure-input";
import { validateFullProcedureOutput } from "./mapping/validate-full-procedure-output";
import { validatePartialProcedureInput } from "./mapping/validate-partial-procedure-input";
import { validatePartialProcedureOutput } from "./mapping/validate-partial-procedure-output";

export abstract class PubTaskBase {

    protected readonly _procedure: PubProcedureConfiguration;

    private readonly _taskIdentifier: string;
    private readonly _taskType: PUB_TASK_TYPE;

    private readonly _dependencies: Map<string, PubConnectionParameterMapping[]>;

    private _taskStatus: PUB_TASK_STATUS;
    private _executeInput: TaskExecuteInput | SEmptyValue;
    private _executeOutput: TaskExecuteOutput | SEmptyValue;

    protected constructor(
        type: PUB_TASK_TYPE,
        initialStatus: PUB_TASK_STATUS,
        procedure: PubProcedureConfiguration,
    ) {

        this._taskIdentifier = UUIDVersion1.generateString();
        this._taskType = type;

        this._dependencies = new Map();

        this._taskStatus = initialStatus;
        this._executeInput = EmptyValueSymbol;
        this._executeOutput = EmptyValueSymbol;

        this._procedure = procedure;
    }

    public get procedure(): PubProcedureConfiguration {
        return this._procedure;
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
        return Array.from(this._dependencies.keys());
    }

    public executable(): boolean {

        return this._dependencies.size === 0
            && this._taskStatus === PUB_TASK_STATUS.QUEUED;
    }

    public resolvable(): boolean {

        return this._dependencies.size === 0
            && this._taskStatus === PUB_TASK_STATUS.AWAIT_DEPENDENCY;
    }

    public setTaskStatus(status: PUB_TASK_STATUS): this {

        this._taskStatus = status;
        return this;
    }

    public addDependency(
        dependency: string,
        parametersMappings: PubConnectionParameterMapping[],
    ): this {

        if (this._dependencies.has(dependency)) {

            const dependencies: PubConnectionParameterMapping[] =
                this._dependencies.get(dependency) as PubConnectionParameterMapping[];

            this._dependencies.set(dependency, [
                ...dependencies,
                ...parametersMappings,
            ]);
            return this;
        }

        this._dependencies.set(dependency, parametersMappings);
        return this;
    }

    public resolveDependency(
        dependency: string,
        output?: TaskExecuteOutput,
    ): this {

        if (!this._dependencies.has(dependency)) {
            return this;
        }

        const mappings: PubConnectionParameterMapping[] =
            this._dependencies.get(dependency) as PubConnectionParameterMapping[];

        if (typeof output !== 'undefined') {
            for (const mapping of mappings) {
                this.combineExecuteInput(
                    mapTaskDependencyOutput(mapping, output),
                );
            }
        }

        this._dependencies.delete(dependency);
        return this;
    }

    public reconnectDependency(
        dependency: string,
        newDependencies: string[],
    ): this {

        if (!this._dependencies.has(dependency)) {
            return this;
        }

        const mappings: PubConnectionParameterMapping[] =
            this._dependencies.get(dependency) as PubConnectionParameterMapping[];

        for (const newDependency of newDependencies) {
            this.addDependency(newDependency, mappings);
        }

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

    public combineExecuteInput(input: TaskExecuteInput): boolean {

        const combinedInput: TaskExecuteInput = {
            ...(this._executeInput === EmptyValueSymbol ? {} : this._executeInput),
            ...input,
        };

        if (!validatePartialProcedureInput(this._procedure, combinedInput)) {
            return false;
        }

        this._executeInput = combinedInput;
        return true;
    }

    public combineInputWithMapping(
        input: TaskExecuteInput,
        mapping: PubConnectionParameterMapping,
    ): this {

        this.combineExecuteInput(
            mapTaskDependencyOutput(mapping, input),
        );
        return this;
    }

    public validateFullExecuteInput(): boolean {

        return validateFullProcedureInput(
            this._procedure,
            this._executeInput === EmptyValueSymbol ? {} : this._executeInput,
        );
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

    public combineExecuteOutput(output: TaskExecuteOutput): boolean {

        const combinedOutput: TaskExecuteOutput = {
            ...(this._executeOutput === EmptyValueSymbol ? {} : this._executeOutput),
            ...output,
        };

        if (!validatePartialProcedureOutput(this._procedure, combinedOutput)) {
            return false;
        }

        this._executeOutput = combinedOutput;
        return true;
    }

    public validateFullExecuteOutput(): boolean {

        return validateFullProcedureOutput(
            this._procedure,
            this._executeOutput === EmptyValueSymbol ? {} : this._executeOutput,
        );
    }

    public abstract serialize(): PubSerializedTask;
    public abstract deserialize(serialized: PubSerializedTask): this;
}
