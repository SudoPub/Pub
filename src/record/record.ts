/**
 * @author WMXPY
 * @namespace Record
 * @description Record
 */

import { PubWorkflowConfiguration } from "../workflow/definition/configuration";

export class PubRecord {

    public static fromWorkflowConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecord {

        return new PubRecord(configuration);
    }

    private readonly _configuration: PubWorkflowConfiguration;

    private constructor(
        configuration: PubWorkflowConfiguration
    ) {

        this._configuration = configuration;
    }
}
