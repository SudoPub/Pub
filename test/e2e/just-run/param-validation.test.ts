/**
 * @author WMXPY
 * @namespace JustRun
 * @description Param Validation
 * @override E2E Test
 */

import { expect } from 'chai';
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

describe('Given (Just-Run Param Validate) Use Case', (): void => {

    const chance: Chance.Chance = new Chance('e2e-just-run-param-validation');

    const helloMessage: string = chance.string();

    const justRunConfiguration: PubCachedWorkflowConfiguration =
        PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
            justRunExample,
        );

    describe('Start Validate', (): void => {

        it('Should be able return false when failed validation with unknown type', (): void => {

            const taskManager: PubTaskManager = initializeCreateTaskManager(justRunConfiguration);

            const applyResult: boolean = applyActionOnTaskManager(
                createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                    taskIdentifier: taskManager
                        .getTasksByProcedureIdentifier(
                            justRunExampleStartProcedure.identifier,
                        )[0]
                        .taskIdentifier,
                    output: {
                        hello: chance.integer(),
                    },
                }),
                taskManager,
            );

            expect(applyResult).to.be.false;
        });

        it('Should be able return succeed when failed validation with empty type', (): void => {

            const taskManager: PubTaskManager = initializeCreateTaskManager(justRunConfiguration);

            const applyResult: boolean = applyActionOnTaskManager(
                createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                    taskIdentifier: taskManager
                        .getTasksByProcedureIdentifier(
                            justRunExampleStartProcedure.identifier,
                        )[0]
                        .taskIdentifier,
                    output: {
                    },
                }),
                taskManager,
            );

            expect(applyResult).to.be.true;
        });

        it('Should be able to validate succeed with correct type', (): void => {

            const taskManager: PubTaskManager = initializeCreateTaskManager(justRunConfiguration);

            const applyResult: boolean = applyActionOnTaskManager(
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

            expect(applyResult).to.be.true;

            ExpectTaskManager.with(taskManager)
                .withTaskFinder()
                .thatWithProcedureIdentifier(justRunExampleStartProcedure.identifier)
                .asSingleTask()
                .toHasStatus(PUB_TASK_STATUS.RESOLVED)
                .toNotHaveInput()
                .toHasOutput({
                    hello: helloMessage,
                });
        });
    });
});
