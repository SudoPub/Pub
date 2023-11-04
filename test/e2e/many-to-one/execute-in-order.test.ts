/**
 * @author WMXPY
 * @namespace ManyToOne
 * @description Execute In Order
 * @override E2E Test
 */

import { expect } from 'chai';
import { createPubAction } from '../../../src/action/create';
import { PUB_ACTION_TYPE } from '../../../src/action/definition/action';
import { initializeCreateTaskManager, initializeCreateTasks } from '../../../src/orchestration/initialize/create-tasks';
import { applyActionOnTaskManager } from '../../../src/task/apply/apply';
import { PubTaskBase } from '../../../src/task/task-base';
import { PubTaskManager } from '../../../src/task/task-manager';
import { PubCachedWorkflowConfiguration } from '../../../src/workflow/cache/configuration';
import { manyToOneExample } from '../../example/many-to-one';
import { ExpectTask } from '../../expect/expect-task';
import { ExpectTaskManager } from '../../expect/expect-task-manager';

describe('Given (Many-To-One Execute In Order) Use Case', (): void => {

    const manyToOneConfiguration: PubCachedWorkflowConfiguration =
        PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
            manyToOneExample,
        );

    it('Should be able to create tasks for one to many configuration', (): void => {

        const tasks: PubTaskBase[] = initializeCreateTasks(manyToOneConfiguration);

        expect(tasks).to.be.lengthOf(4);

        ExpectTask.with(tasks[0]).toBeTask();
        ExpectTask.with(tasks[1]).toBeTask();
        ExpectTask.with(tasks[2]).toBeTask();
        ExpectTask.with(tasks[3]).toBeTask();
    });

    describe('Iteration - [Execute one by one]', (): void => {

        const taskManager: PubTaskManager = initializeCreateTaskManager(manyToOneConfiguration);

        it('Should be able to get first batch of executable tasks', (): void => {

            ExpectTaskManager.with(taskManager)
                .hasExecutableTaskLength(3);

            ExpectTaskManager.with(taskManager)
                .forTaskWithProcedureIdentifier("FIRST")
                .toBeExecutable();
            ExpectTaskManager.with(taskManager)
                .forTaskWithProcedureIdentifier("SECOND")
                .toBeExecutable();
            ExpectTaskManager.with(taskManager)
                .forTaskWithProcedureIdentifier("THIRD")
                .toBeExecutable();
        });

        it('Should be able to get second batch of executable tasks', (): void => {

            applyActionOnTaskManager(
                createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                    taskIdentifier: taskManager
                        .getTasksByProcedureIdentifier("FIRST")[0]
                        .taskIdentifier,
                    output: {},
                }),
                taskManager,
            );

            ExpectTaskManager.with(taskManager)
                .hasExecutableTaskLength(2);

            ExpectTaskManager.with(taskManager)
                .forTaskWithProcedureIdentifier("SECOND")
                .toBeExecutable();
            ExpectTaskManager.with(taskManager)
                .forTaskWithProcedureIdentifier("THIRD")
                .toBeExecutable();
        });

        it('Should be able to get third batch of executable tasks', (): void => {

            applyActionOnTaskManager(
                createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                    taskIdentifier: taskManager
                        .getTasksByProcedureIdentifier("SECOND")[0]
                        .taskIdentifier,
                    output: {},
                }),
                taskManager,
            );

            ExpectTaskManager.with(taskManager)
                .hasExecutableTaskLength(1);

            ExpectTaskManager.with(taskManager)
                .forTaskWithProcedureIdentifier("THIRD")
                .toBeExecutable();
        });

        it('Should be able to get fourth batch of executable tasks', (): void => {

            applyActionOnTaskManager(
                createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                    taskIdentifier: taskManager
                        .getTasksByProcedureIdentifier("THIRD")[0]
                        .taskIdentifier,
                    output: {},
                }),
                taskManager,
            );

            ExpectTaskManager.with(taskManager)
                .hasExecutableTaskLength(1);

            ExpectTaskManager.with(taskManager)
                .forTaskWithProcedureIdentifier("END")
                .toBeExecutable();
        });
    });
});
