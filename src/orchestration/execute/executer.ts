/**
 * @author WMXPY
 * @namespace Orchestration_Execute
 * @description Executer
 */

import { PubRecord } from "../../record/record";
import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";
import { PubExecuteParameters } from "../definition/execute";
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

    public async execute(
        parameters: PubExecuteParameters,
    ): Promise<PubRecord> {

        const record: PubRecord =
            PubRecord.fromWorkflowConfiguration(this._configuration);

        return record;
    }
}
