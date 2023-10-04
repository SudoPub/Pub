/**
 * @author WMXPY
 * @namespace Orchestration_Execute
 * @description Executer
 */

import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";
import { PubWorkflowRecord } from "../../workflow/definition/record";
import { enrichWorkflowConfiguration } from "../../workflow/record/enrich";
import { OrchestrationResourceManager } from "../resource/manager";

export class PubExecuter {

    public static create(
        configuration: PubWorkflowConfiguration,
        resourceManager: OrchestrationResourceManager,
    ): PubExecuter {

        return new PubExecuter(configuration, resourceManager);
    }

    private readonly _resourceManager: OrchestrationResourceManager;
    private readonly _configuration: PubWorkflowConfiguration;

    private constructor(
        configuration: PubWorkflowConfiguration,
        resourceManager: OrchestrationResourceManager,
    ) {

        this._configuration = configuration;
        this._resourceManager = resourceManager;
    }

    public async execute(): Promise<PubWorkflowRecord> {

        const enriched: PubWorkflowRecord = enrichWorkflowConfiguration(this._configuration);

        return enriched;
    }
}
