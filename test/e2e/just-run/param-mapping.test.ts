/**
 * @author WMXPY
 * @namespace JustRun
 * @description Param Mapping
 * @override E2E Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createPubAction } from '../../../src/action/create';
import { PUB_ACTION_TYPE } from '../../../src/action/definition/action';
import { initializeCreateTaskManager } from '../../../src/orchestration/initialize/create-tasks';
import { applyActionOnTaskManager } from '../../../src/task/apply/apply';
import { PubTaskManager } from '../../../src/task/task-manager';
import { PubCachedWorkflowConfiguration } from '../../../src/workflow/cache/configuration';
import { justRunExample, justRunExampleStartProcedure } from '../../example/just-run';
import { ExpectTaskManager } from '../../expect/expect-task-manager';

describe('Given (Just-Run Param Mapping) Use Case', (): void => {

    const chance: Chance.Chance = new Chance('e2e-just-run-param-mapping');

    const helloMessage: string = chance.string();

    const justRunConfiguration: PubCachedWorkflowConfiguration =
        PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
            justRunExample,
        );

    it('Should be able to map variable from start to first', (): void => {

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
            .forSingleTaskWithProcedureIdentifier("JUST_RUN")
            .toHasInput({
                world: helloMessage,
            });
    });
});
