/**
 * @author WMXPY
 * @namespace TwoActionMap
 * @description Resolve Map
 * @override E2E Test
 */

import { PUB_ACTION_TYPE, PUB_TASK_STATUS, PUB_TASK_TYPE, createPubAction } from '@sudopub/essential';
import { expect } from 'chai';
import { PubTaskManager } from '../../../src';
import { initializeCreateTaskManager } from '../../../src/orchestration/initialize/create-tasks';
import { applyActionOnTaskManager } from '../../../src/task/apply/apply';
import { PubCachedWorkflowConfiguration } from '../../../src/workflow/cache/configuration';
import { twoActionMapExample, twoActionMapStartProcedure } from '../../example/two-action-map';
import { ExpectTaskManager } from '../../expect/expect-task-manager';

describe('Given (Two-Action-Map Resolve Map) Use Case', (): void => {

    const twoActionMapConfiguration: PubCachedWorkflowConfiguration =
        PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
            twoActionMapExample,
        );

    const taskManager: PubTaskManager = initializeCreateTaskManager(twoActionMapConfiguration);

    it('Should be able to map variable from start to first', (): void => {

        const applyResult: boolean = applyActionOnTaskManager(
            createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                taskIdentifier: taskManager
                    .getTasksByProcedureIdentifier(
                        twoActionMapStartProcedure.identifier,
                    )[0]
                    .taskIdentifier,
                output: {
                    initial: [0],
                },
            }),
            taskManager,
        );

        expect(applyResult).to.be.true;

        ExpectTaskManager.with(taskManager)
            .hasExecutableTaskLength(1)
            .withTaskFinder()
            .thatWithProcedureIdentifier("MAP")
            .toHasLengthOf(2)
            .thatWithTaskStatus(PUB_TASK_STATUS.RESOLVED)
            .asSingleTask()
            .toHasTaskType(PUB_TASK_TYPE.MAP_ESPIAL)
            .toHasInput({
                iteration: [0],
            });

        ExpectTaskManager.with(taskManager)
            .withTaskFinder()
            .thatWithProcedureIdentifier("TIMES")
            .asSingleTask()
            .toHasInput({
                value: 0,
            });
    });

    it('Should be able to resolve first iteration item', (): void => {

        const applyResult: boolean = applyActionOnTaskManager(
            createPubAction(PUB_ACTION_TYPE.TASK_RESOLVE_SUCCEED, {
                taskIdentifier: taskManager
                    .getTasksByProcedureIdentifier(
                        "TIMES",
                    )[0]
                    .taskIdentifier,
                output: {
                    value: 5,
                },
            }),
            taskManager,
        );

        expect(applyResult).to.be.true;

        ExpectTaskManager.with(taskManager)
            .hasExecutableTaskLength(1)
            .withTaskFinder()
            .thatWithProcedureIdentifier("PLUS")
            .thatWithTaskStatus(PUB_TASK_STATUS.QUEUED)
            .asSingleTask()
            .toHasTaskType(PUB_TASK_TYPE.DRIVER)
            .toBeExecutable()
            .toHasInput({
                value: 5,
            });
    });
});
