/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Task
 * @override Expect
 */

import { PUB_TASK_STATUS, PUB_TASK_TYPE } from '@sudopub/essential';
import { expect } from 'chai';
import { PubTaskBase } from "../../src";

/* eslint-disable @typescript-eslint/no-unused-expressions */
export class ExpectTask {

    public static with(
        task: PubTaskBase,
    ): ExpectTask {

        return new ExpectTask(task);
    }

    private readonly _task: PubTaskBase;

    private constructor(
        task: PubTaskBase,
    ) {

        this._task = task;
    }

    public toBeTask(): this {

        expect(this._task).to.be.instanceOf(PubTaskBase);
        return this;
    }

    public toBeEqualToTask(task: PubTaskBase): this {

        expect(this._task.taskIdentifier).to.be.equal(task.taskIdentifier);
        return this;
    }

    public toBeExecutable(): this {

        expect(this._task.executable()).to.be.true;
        return this;
    }

    public toHasTaskType(type: PUB_TASK_TYPE): this {

        expect(this._task.taskType).to.be.equal(type);
        return this;
    }

    public toHasStatus(status: PUB_TASK_STATUS): this {

        expect(this._task.taskStatus).to.be.equal(status);
        return this;
    }

    public toHasProcedureIdentifier(identifier: string): this {

        expect(this._task.procedure.identifier).to.be.equal(identifier);
        return this;
    }

    public toHasDependencyIdentifiers(dependencies: string[]): this {

        expect(this._task.dependencies).to.be.deep.equal(dependencies);
        return this;
    }

    public toHasDependencyTasks(dependencies: PubTaskBase[]): this {

        expect(this._task.dependencies).to.be.deep.equal(
            dependencies.map((task: PubTaskBase) => task.taskIdentifier),
        );
        return this;
    }

    public toHasInput(input: Record<string, any>): this {

        if (!this._task.getExecuteInput().exists) {
            expect.fail('Expect to have input, but not');
        }

        expect(this._task
            .getExecuteInput()
            .getOrThrow())
            .to.be.deep.equal(input);
        return this;
    }

    public toNotHaveInput(): this {

        if (this._task.getExecuteInput().exists) {
            expect.fail(`Expect to not have input, but have ${JSON.stringify(this._task.getExecuteInput().getOrThrow())}`);
        }

        return this;
    }

    public toHasOutput(output: Record<string, any>): this {

        if (!this._task.getExecuteOutput().exists) {
            expect.fail('Expect to have output, but not');
        }

        expect(this._task
            .getExecuteOutput()
            .getOrThrow())
            .to.be.deep.equal(output);
        return this;
    }

    public toNotHaveOutput(): this {

        if (this._task.getExecuteOutput().exists) {
            expect.fail(`Expect to not have output, but have ${JSON.stringify(this._task.getExecuteOutput().getOrThrow())}`);
        }

        return this;
    }
}
