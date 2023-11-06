/**
 * @author WMXPY
 * @namespace Orchestrator
 * @description Orchestrator
 */

import { PUB_ACTION_TYPE, PubAction } from "../action/definition/action";
import { initializeCreateTaskManager } from "../orchestration/initialize/create-tasks";
import { PUB_PLAN_TYPE, PubPlan } from "../plan/definition/plan";
import { applyActionOnTaskManager } from "../task/apply/apply";
import { PubTaskManager } from "../task/task-manager";
import { PubCachedWorkflowConfiguration } from "../workflow/cache/configuration";
import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { planForNext } from "./plan/plan-next";

export class PubOrchestrator {

    public static fromWorkflowConfiguration(
        workflowConfiguration: PubWorkflowConfiguration,
    ): PubOrchestrator {

        return new PubOrchestrator(workflowConfiguration);
    }

    private readonly _configuration: PubCachedWorkflowConfiguration;
    private readonly _taskManager: PubTaskManager;

    private constructor(
        workflowConfiguration: PubWorkflowConfiguration,
    ) {

        this._configuration = PubCachedWorkflowConfiguration
            .fromWorkflowConfiguration(workflowConfiguration);

        this._taskManager = initializeCreateTaskManager(this._configuration);
    }

    public applyAction(
        action: PubAction<PUB_ACTION_TYPE>,
    ): boolean {

        const applyResult: boolean = applyActionOnTaskManager(action, this._taskManager);
        return applyResult;
    }

    public planNext(): Array<PubPlan<PUB_PLAN_TYPE>> {

        return planForNext(this._configuration, this._taskManager);
    }
}