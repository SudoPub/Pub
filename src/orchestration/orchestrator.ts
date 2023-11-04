/**
 * @author WMXPY
 * @namespace Orchestration
 * @description Orchestrator
 */

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
}
