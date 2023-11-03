/**
 * @author WMXPY
 * @namespace Orchestration_Task
 * @description Create Tasks
 * @override E2E Test
 */

import { expect } from 'chai';
import { initializeCreateTasks } from '../../../../src/orchestration/initialize/create-tasks';
import { PubTask } from '../../../../src/task/task';
import { PubCachedWorkflowConfiguration } from '../../../../src/workflow/cache/configuration';
import { justRunExample } from '../../../example/just-run';

describe('Given (Orchestration-Task Create Tasks) Use Case', (): void => {

    const justRunConfiguration: PubCachedWorkflowConfiguration = PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
        justRunExample,
    );

    it('Should be able to create tasks for just run configuration', (): void => {

        const tasks: PubTask[] = initializeCreateTasks(justRunConfiguration);

        expect(tasks).to.be.lengthOf(1);
    });
});
