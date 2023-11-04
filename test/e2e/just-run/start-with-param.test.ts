/**
 * @author WMXPY
 * @namespace JustRun
 * @description Start With Param
 * @override E2E Test
 */

import * as Chance from 'chance';
import { createPubAction } from '../../../src/action/create';
import { PUB_ACTION_TYPE } from '../../../src/action/definition/action';
import { initializeCreateTaskManager } from '../../../src/orchestration/initialize/create-tasks';
import { applyActionOnTaskManager } from '../../../src/task/apply/apply';
import { PUB_TASK_STATUS } from '../../../src/task/definition/task';
import { PubTaskManager } from '../../../src/task/task-manager';
import { PubCachedWorkflowConfiguration } from '../../../src/workflow/cache/configuration';
import { justRunExample, justRunExampleStartProcedure } from '../../example/just-run';
import { ExpectTaskManager } from '../../expect/expect-task-manager';

describe.only('Given (Just-Run Start With Param) Use Case', (): void => {

    const chance: Chance.Chance = new Chance('e2e-just-run-start-with-param');

    const helloMessage: string = chance.string();

    const justRunConfiguration: PubCachedWorkflowConfiguration =
        PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
            justRunExample,
        );

    it('Should be able to start execution with parameter', (): void => {

        const taskManager: PubTaskManager = initializeCreateTaskManager(justRunConfiguration);

        applyActionOnTaskManager(
            createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                taskIdentifier: taskManager
                    .getTasksByProcedureIdentifier(
                        justRunExampleStartProcedure.identifier,
                    )[0]
                    .taskIdentifier,
                output: {
                    hello: helloMessage,
                },
            }),
            taskManager,
        );

        ExpectTaskManager.with(taskManager)
            .forTaskWithProcedureIdentifier(justRunExampleStartProcedure.identifier)
            .toHasStatus(PUB_TASK_STATUS.RESOLVED);
    });
});
