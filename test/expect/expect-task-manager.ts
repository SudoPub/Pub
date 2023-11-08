/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Task Manager
 * @override Expect
 */

import { expect } from 'chai';
import { PubTaskManager } from '../../src/task/task-manager';
import { ExpectTaskFinder } from './expect-task-finder';

export class ExpectTaskManager {

    public static with(
        taskManager: PubTaskManager,
    ): ExpectTaskManager {

        return new ExpectTaskManager(taskManager);
    }

    private readonly _taskManager: PubTaskManager;

    private constructor(
        taskManager: PubTaskManager,
    ) {

        this._taskManager = taskManager;
    }

    public hasExecutableTaskLength(length: number): this {

        const executableTasks = this._taskManager.getExecutableTasks();

        expect(executableTasks).to.be.lengthOf(length);
        return this;
    }

    public withTaskFinder(): ExpectTaskFinder {

        return ExpectTaskFinder.with(this._taskManager.tasks);
    }
}
