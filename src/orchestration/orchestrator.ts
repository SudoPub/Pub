/**
 * @author WMXPY
 * @namespace Orchestration
 * @description Orchestrator
 */

import { PubExecuter } from "../execute/executer";
import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { OrchestrationResourceManager } from "./resource/manager";

export class PubOrchestrator {

    public static fromScratch(): PubOrchestrator {

        const resourceManager: OrchestrationResourceManager =
            OrchestrationResourceManager.fromScratch();

        return new PubOrchestrator(resourceManager);
    }

    public static fromResourceManager(
        resourceManager: OrchestrationResourceManager,
    ): PubOrchestrator {

        return new PubOrchestrator(resourceManager);
    }

    private readonly _resourceManager: OrchestrationResourceManager;

    private constructor(
        resourceManager: OrchestrationResourceManager
    ) {

        this._resourceManager = resourceManager;
    }

    public createExecuter(
        configuration: PubWorkflowConfiguration,
    ): PubExecuter {

        return PubExecuter.create(configuration, this._resourceManager);
    }
}
