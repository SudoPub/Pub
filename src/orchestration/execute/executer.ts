/**
 * @author WMXPY
 * @namespace Orchestration_Execute
 * @description Executer
 */

import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";
import { OrchestrationResourceManager } from "../resource/manager";

export class PubExecuter {

    private readonly _resourceManager: OrchestrationResourceManager;
    private readonly _configuration: PubWorkflowConfiguration;

    public constructor(
        configuration: PubWorkflowConfiguration,
        resourceManager: OrchestrationResourceManager,
    ) {

        this._configuration = configuration;
        this._resourceManager = resourceManager;
    }

    public execute(): Promise<boolean> {

        return Promise.resolve(true);
    }
}
