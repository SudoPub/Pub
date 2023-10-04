/**
 * @author WMXPY
 * @namespace Orchestration
 * @description Orchestrator
 */

import { PubWorkflowConfiguration } from "../workflow/definition/configuration";

export class PubOrchestrator {

    private readonly _configuration: PubWorkflowConfiguration;

    public constructor(configuration: PubWorkflowConfiguration) {

        this._configuration = configuration;
    }
}
