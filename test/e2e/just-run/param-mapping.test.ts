/**
 * @author WMXPY
 * @namespace JustRun
 * @description Param Mapping
 * @override E2E Test
 */

import { PUB_ACTION_TYPE, createPubAction } from '@sudopub/essential';
import { expect } from 'chai';
import * as Chance from 'chance';
import { PubTaskManager } from '../../../src';
import { initializeCreateTaskManager } from '../../../src/orchestration/initialize/create-tasks';
import { applyActionOnTaskManager } from '../../../src/task/apply/apply';
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
            .withTaskFinder()
            .thatWithProcedureIdentifier("JUST_RUN")
            .asSingleTask()
            .toHasInput({
                world: helloMessage,
            });
    });
});
