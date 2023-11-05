/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Task Manager
 * @override Expect
 */

import { PubTaskManager } from '../../src/task/task-manager';
import { ExpectTask } from './expect-task';
import { expect, } from 'chai';

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

    public forTaskWithIdentifier(identifier: string): ExpectTask {

        const task = this._taskManager.getTaskByIdentifier(identifier);

        if (!task.exists) {
            expect.fail(`Task with identifier ${identifier} not found`);
        }

        return ExpectTask.with(task.getOrThrow());
    }

    public forSingleTaskWithProcedureIdentifier(identifier: string): ExpectTask {

        const tasks = this._taskManager.getTasksByProcedureIdentifier(identifier);

        if (tasks.length === 0) {

            expect.fail(`Task with procedure identifier ${identifier} not found`);
        }

        if (tasks.length > 1) {

            expect.fail(`Task with procedure identifier ${identifier} found more than one`);
        }

        return ExpectTask.with(tasks[0]);
    }
}
