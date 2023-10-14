/**
 * @author WMXPY
 * @namespace Execute
 * @description Executer
 */

import { Verifier } from "@sudoo/verify";
import { PubExecuteVerifyInvalidParametersError } from "../error/execute/verify/invalid-parameters";
import { PUB_WORKFLOW_RECORD_TICK_TYPE } from "../record/definition/tick";
import { PubRecord } from "../record/record";
import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { PubExecuteParameters } from "../orchestration/definition/execute";
import { OrchestrationResourceManager } from "../orchestration/resource/manager";
import { resumeExecute } from "./resume-execute";

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

        const verifyResult: boolean = this.verifyParameters(parameters);

        if (!verifyResult) {

            throw PubExecuteVerifyInvalidParametersError.create(
                this._configuration.startParametersPattern,
                parameters,
            );
        }

        return await this.executeWithoutVerify(parameters);
    }

    public async executeWithoutVerify(
        parameters: PubExecuteParameters,
    ): Promise<PubRecord> {

        const record: PubRecord =
            PubRecord.fromWorkflowConfiguration(this._configuration);

        record.addTick(
            PUB_WORKFLOW_RECORD_TICK_TYPE.EXECUTE_PARAMETERS,
            {
                parameters,
            },
        );

        return await resumeExecute(record, this._resourceManager);
    }

    public verifyParameters(
        parameters: PubExecuteParameters,
    ): boolean {

        const verifier: Verifier = Verifier.create(
            this._configuration.startParametersPattern,
        );

        if (!verifier.verify(parameters)) {
            return false;
        }

        return true;
    }
}
