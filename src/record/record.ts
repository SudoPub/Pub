/**
 * @author WMXPY
 * @namespace Record
 * @description Record
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { PUB_WORKFLOW_RECORD_TICK_TYPE, PubWorkflowRecordTick, PubWorkflowRecordTickPayloadSwitch } from "./definition/tick";

export class PubRecord {

    public static fromWorkflowConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecord {

        return new PubRecord(configuration);
    }

    private readonly _configuration: PubWorkflowConfiguration;
    private readonly _ticks: Array<PubWorkflowRecordTick<PUB_WORKFLOW_RECORD_TICK_TYPE>>;

    private constructor(
        configuration: PubWorkflowConfiguration
    ) {

        this._configuration = configuration;
        this._ticks = [];
    }

    public get configuration(): PubWorkflowConfiguration {
        return this._configuration;
    }

    public get ticks(): Array<PubWorkflowRecordTick<PUB_WORKFLOW_RECORD_TICK_TYPE>> {
        return this._ticks;
    }

    public addTick<T extends PUB_WORKFLOW_RECORD_TICK_TYPE>(
        type: T,
        tickPayload: PubWorkflowRecordTickPayloadSwitch<T>,
    ): this {

        const enrichedTick: PubWorkflowRecordTick<T> = {

            identifier: UUIDVersion1.generateString(),
            type,

            payload: tickPayload,

            timestamp: new Date(),
        };

        this._ticks.push(enrichedTick);
        return this;
    }
}
