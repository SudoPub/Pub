/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Task Finder
 * @override Expect
 */

import { PUB_TASK_STATUS } from '@sudopub/essential';
import { expect, } from 'chai';
import { PubTaskBase } from '../../src/task/task-base';
import { ExpectTask } from './expect-task';

export class ExpectTaskFinder {

    public static with(
        tasks: PubTaskBase[],
    ): ExpectTaskFinder {

        return new ExpectTaskFinder(tasks);
    }

    private _tasks: PubTaskBase[];

    private constructor(
        tasks: PubTaskBase[],
    ) {

        this._tasks = tasks;
    }

    public thatWithTaskIdentifier(identifier: string): this {

        this._tasks = this._tasks
            .filter((each: PubTaskBase) => {
                return each.taskIdentifier === identifier;
            });
        return this;
    }

    public thatWithTaskStatus(status: PUB_TASK_STATUS): this {

        this._tasks = this._tasks
            .filter((each: PubTaskBase) => {
                return each.taskStatus === status;
            });
        return this;
    }

    public thatWithProcedureIdentifier(identifier: string): this {

        this._tasks = this._tasks
            .filter((each: PubTaskBase) => {
                return each.procedure.identifier === identifier;
            });
        return this;
    }

    public toHasLengthOf(length: number): this {

        expect(this._tasks).to.be.lengthOf(length);
        return this;
    }

    public asSingleTask(): ExpectTask {

        if (this._tasks.length === 0) {

            expect.fail(`Task not found in Task Finder`);
        }

        if (this._tasks.length > 1) {

            expect.fail(`Multiple tasks found ${this._tasks.length} in Task Finder, ${this._tasks.map((each: PubTaskBase) => each.taskIdentifier).join(', ')}`);
        }

        return ExpectTask.with(this._tasks[0]);
    }

    public asTasks(): ExpectTask[] {

        return this._tasks.map((each: PubTaskBase) => ExpectTask.with(each));
    }
}
