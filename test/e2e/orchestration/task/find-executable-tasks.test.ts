/**
 * @author WMXPY
 * @namespace Orchestration_Task
 * @description Find Executable Tasks
 * @override E2E Test
 */

import { PUB_ACTION_TYPE, PUB_TASK_TYPE, createPubAction } from '@sudopub/essential';
import { expect } from 'chai';
import { PubTaskBase, PubTaskManager } from '../../../../src';
import { initializeCreateTaskManager } from '../../../../src/orchestration/initialize/create-tasks';
import { applyActionOnTaskManager } from '../../../../src/task/apply/apply';
import { PubCachedWorkflowConfiguration } from '../../../../src/workflow/cache/configuration';
import { justRunExample, justRunExampleStartProcedure } from '../../../example/just-run';
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
            .toHasTaskType(PUB_TASK_TYPE.START);
    });

    it('Should be able to find executable tasks with simple case after apply', (): void => {

        const taskManager: PubTaskManager = initializeCreateTaskManager(justRunConfiguration);

        applyActionOnTaskManager(
            createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                taskIdentifier: taskManager.getTasksByProcedureIdentifier(
                    justRunExampleStartProcedure.identifier,
                )[0].taskIdentifier,
                output: {},
            }),
            taskManager,
        );

        const executableTasks: PubTaskBase[] = taskManager.getExecutableTasks();

        expect(executableTasks).to.be.lengthOf(1);

        ExpectTask.with(executableTasks[0])
            .toBeTask()
            .toHasTaskType(PUB_TASK_TYPE.DRIVER)
            .toHasProcedureIdentifier("JUST_RUN");
    });
});
