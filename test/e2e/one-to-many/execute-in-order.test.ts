/**
 * @author WMXPY
 * @namespace OneToMany
 * @description Execute In Order
 * @override E2E Test
 */

import { expect } from 'chai';
import { initializeCreateTaskManager, initializeCreateTasks } from '../../../src/orchestration/initialize/create-tasks';
import { PubTaskBase } from '../../../src/task/task-base';
import { PubTaskManager } from '../../../src/task/task-manager';
import { PubCachedWorkflowConfiguration } from '../../../src/workflow/cache/configuration';
import { oneToManyExample } from '../../example/one-to-many';
import { ExpectTask } from '../../expect/expect-task';

describe('Given (One-To-Many Execute In Order) Use Case', (): void => {

    const oneToManyConfiguration: PubCachedWorkflowConfiguration = PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
        oneToManyExample,
    );

    it('Should be able to create tasks for one to many configuration', (): void => {

        const tasks: PubTaskBase[] = initializeCreateTasks(oneToManyConfiguration);

        expect(tasks).to.be.lengthOf(4);

        ExpectTask.with(tasks[0]).toBeTask();
        ExpectTask.with(tasks[1]).toBeTask();
        ExpectTask.with(tasks[2]).toBeTask();
        ExpectTask.with(tasks[3]).toBeTask();
    });

    it('Should be able to get first available task', (): void => {

        const taskManager: PubTaskManager = initializeCreateTaskManager(oneToManyConfiguration);

        const executableTasks: PubTaskBase[] = taskManager.getExecutableTasks();

        expect(executableTasks).to.be.lengthOf(1);
    });
});
