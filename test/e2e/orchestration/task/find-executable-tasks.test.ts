/**
 * @author WMXPY
 * @namespace Orchestration_Task
 * @description Find Executable Tasks
 * @override E2E Test
 */

import { expect } from 'chai';
import { initializeCreateTaskManager } from '../../../../src/orchestration/initialize/create-tasks';
import { PUB_TASK_TYPE } from '../../../../src/task/definition/task';
import { PubTaskBase } from '../../../../src/task/task-base';
import { PubTaskManager } from '../../../../src/task/task-manager';
import { PubCachedWorkflowConfiguration } from '../../../../src/workflow/cache/configuration';
import { justRunExample } from '../../../example/just-run';
import { ExpectTask } from '../../../expect/expect-task';

describe('Given (Orchestration-Task Find Executable Tasks) Use Case', (): void => {

    const justRunConfiguration: PubCachedWorkflowConfiguration = PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
        justRunExample,
    );

    it('Should be able to find executable tasks with simple case', (): void => {

        const taskManager: PubTaskManager = initializeCreateTaskManager(justRunConfiguration);

        const executableTasks: PubTaskBase[] = taskManager.getExecutableTasks();

        expect(executableTasks).to.be.lengthOf(1);

        ExpectTask.with(executableTasks[0])
            .toBeTask()
            .toHasTaskType(PUB_TASK_TYPE.DRIVER);
    });
});
