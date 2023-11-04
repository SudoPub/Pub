/**
 * @author WMXPY
 * @namespace Orchestration_Task
 * @description Create Tasks
 * @override E2E Test
 */

import { expect } from 'chai';
import { initializeCreateTasks } from '../../../../src/orchestration/initialize/create-tasks';
import { PubTaskBase } from '../../../../src/task/task-base';
import { PubCachedWorkflowConfiguration } from '../../../../src/workflow/cache/configuration';
import { justRunExample } from '../../../example/just-run';
import { ExpectTask } from '../../../expect/expect-task';

describe('Given (Orchestration-Task Create Tasks) Use Case', (): void => {

    const justRunConfiguration: PubCachedWorkflowConfiguration = PubCachedWorkflowConfiguration.fromWorkflowConfiguration(
        justRunExample,
    );

    it('Should be able to create tasks for just run configuration', (): void => {

        const tasks: PubTaskBase[] = initializeCreateTasks(justRunConfiguration);

        expect(tasks).to.be.lengthOf(2);

        ExpectTask.with(tasks[0]).toBeTask();
        ExpectTask.with(tasks[1]).toBeTask();
    });

    it('Should be able to create tasks for just run configuration for correct dependencies', (): void => {

        const tasks: PubTaskBase[] = initializeCreateTasks(justRunConfiguration);

        expect(tasks).to.be.lengthOf(2);

        ExpectTask.with(tasks[0]).toHasDependencyTasks([]);
        ExpectTask.with(tasks[1]).toHasDependencyTasks([tasks[0]]);
    });
});
