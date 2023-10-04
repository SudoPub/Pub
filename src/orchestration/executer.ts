/**
 * @author WMXPY
 * @namespace Orchestration
 * @description Executer
 */

import { PubWorkflowConfiguration } from "../workflow/definition/configuration";

export class PubExecuter {

    private readonly _configuration: PubWorkflowConfiguration;

    public constructor(configuration: PubWorkflowConfiguration) {

        this._configuration = configuration;
    }
}
