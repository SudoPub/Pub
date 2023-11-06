/**
 * @author WMXPY
 * @namespace TwoActionMap
 * @description Resolve Map
 * @override E2E Test
 */

import { expect } from 'chai';
import { createPubAction } from '../../../src/action/create';
import { PUB_ACTION_TYPE } from '../../../src/action/definition/action';
import { initializeCreateTaskManager } from '../../../src/orchestration/initialize/create-tasks';
import { applyActionOnTaskManager } from '../../../src/task/apply/apply';
import { PUB_TASK_STATUS, PUB_TASK_TYPE } from '../../../src/task/definition/task';
import { PubTaskManager } from '../../../src/task/task-manager';
import { PubCachedWorkflowConfiguration } from '../../../src/workflow/cache/configuration';
import { twoActionMapExample, twoActionMapStartProcedure } from '../../example/two-action-map';
import { ExpectTaskManager } from '../../expect/expect-task-manager';

describe('Given (Two-Action-Map Resolve Map) Use Case', (): void => {

    const twoActionMapConfiguration: PubCachedWorkflowConfiguration =
        PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
            twoActionMapExample,
        );

    it('Should be able to map variable from start to first', (): void => {

        const taskManager: PubTaskManager = initializeCreateTaskManager(twoActionMapConfiguration);

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
    });
});
