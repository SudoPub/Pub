/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Task
 * @override Expect
 */

import { expect } from 'chai';
import { PubTaskBase } from "../../src/task/task-base";
import { PUB_TASK_TYPE } from '../../src/task/definition/task';

export class ExpectTask {

    public static with(
        task: PubTaskBase
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

    public toHasTaskType(type: PUB_TASK_TYPE): this {

        expect(this._task.taskType).to.be.equal(type);
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
}