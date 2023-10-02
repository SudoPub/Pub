/**
 * @author WMXPY
 * @namespace Workflow
 * @description Workflow
 */

import { PubWorkflowConfiguration } from "./definition/configuration";

export class PubWorkflow {

    private readonly _configuration: PubWorkflowConfiguration;

    public constructor(configuration: PubWorkflowConfiguration) {

        this._configuration = configuration;
    }
}
