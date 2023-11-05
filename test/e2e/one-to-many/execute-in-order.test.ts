/**
 * @author WMXPY
 * @namespace OneToMany
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
import { oneToManyExample } from '../../example/one-to-many';
import { ExpectTask } from '../../expect/expect-task';
import { ExpectTaskManager } from '../../expect/expect-task-manager';

describe('Given (One-To-Many Execute In Order) Use Case', (): void => {

    const oneToManyConfiguration: PubCachedWorkflowConfiguration =
        PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
            oneToManyExample,
        );

    it('Should be able to create tasks for one to many configuration', (): void => {

        const tasks: PubTaskBase[] = initializeCreateTasks(oneToManyConfiguration);

        expect(tasks).to.be.lengthOf(6);

        tasks.forEach((task: PubTaskBase) => {
            ExpectTask.with(task).toBeTask();
        });
    });

    describe('Iteration - [Execute one by one]', (): void => {

        const taskManager: PubTaskManager = initializeCreateTaskManager(oneToManyConfiguration);

        it('Should be able to get first batch of executable tasks', (): void => {

            ExpectTaskManager.with(taskManager)
                .hasExecutableTaskLength(1)
                .forSingleTaskWithProcedureIdentifier("START")
                .toBeExecutable();
        });

        it('Should be able to get second batch of executable tasks', (): void => {

            applyActionOnTaskManager(
                createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                    taskIdentifier: taskManager
                        .getTasksByProcedureIdentifier("START")[0]
                        .taskIdentifier,
                    output: {},
                }),
                taskManager,
            );

            ExpectTaskManager.with(taskManager)
                .hasExecutableTaskLength(1)
                .forSingleTaskWithProcedureIdentifier("INIT")
                .toBeExecutable();
        });

        it('Should be able to get third batch of executable tasks', (): void => {

            applyActionOnTaskManager(
                createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                    taskIdentifier: taskManager
                        .getTasksByProcedureIdentifier("INIT")[0]
                        .taskIdentifier,
                    output: {},
                }),
                taskManager,
            );

            ExpectTaskManager.with(taskManager)
                .hasExecutableTaskLength(3);

            ExpectTaskManager.with(taskManager)
                .forSingleTaskWithProcedureIdentifier("FIRST")
                .toBeExecutable();
            ExpectTaskManager.with(taskManager)
                .forSingleTaskWithProcedureIdentifier("SECOND")
                .toBeExecutable();
            ExpectTaskManager.with(taskManager)
                .forSingleTaskWithProcedureIdentifier("THIRD")
                .toBeExecutable();
        });

        it('Should be able to get fourth batch of executable tasks', (): void => {

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
                .hasExecutableTaskLength(3);

            ExpectTaskManager.with(taskManager)
                .forSingleTaskWithProcedureIdentifier("END")
                .toBeExecutable();
            ExpectTaskManager.with(taskManager)
                .forSingleTaskWithProcedureIdentifier("SECOND")
                .toBeExecutable();
            ExpectTaskManager.with(taskManager)
                .forSingleTaskWithProcedureIdentifier("THIRD")
                .toBeExecutable();
        });

        it('Should be able to get fifth batch of executable tasks', (): void => {

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
                .hasExecutableTaskLength(2);

            ExpectTaskManager.with(taskManager)
                .forSingleTaskWithProcedureIdentifier("END")
                .toBeExecutable();
            ExpectTaskManager.with(taskManager)
                .forSingleTaskWithProcedureIdentifier("THIRD")
                .toBeExecutable();
        });

        it('Should be able to get sixth batch of executable tasks', (): void => {

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
                .forSingleTaskWithProcedureIdentifier("END")
                .toBeExecutable();
        });
    });
});
