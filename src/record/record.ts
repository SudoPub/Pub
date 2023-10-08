/**
 * @author WMXPY
 * @namespace Record
 * @description Record
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { PubWorkflowRecordTick, PubWorkflowRecordTickSwitch } from "./definition/tick";

export class PubRecord {

    public static fromWorkflowConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecord {

        return new PubRecord(configuration);
    }

    private readonly _configuration: PubWorkflowConfiguration;
    private readonly _ticks: PubWorkflowRecordTick[];

    private constructor(
        configuration: PubWorkflowConfiguration
    ) {

        this._configuration = configuration;
        this._ticks = [];
    }

    public get configuration(): PubWorkflowConfiguration {
        return this._configuration;
    }

    public get ticks(): PubWorkflowRecordTick[] {
        return this._ticks;
    }

    public addTick(
        tick: PubWorkflowRecordTickSwitch,
    ): this {

        const enrichedTick: PubWorkflowRecordTick = {

            identifier: UUIDVersion1.generateString(),
            timestamp: new Date(),

            ...tick,
        };

        this._ticks.push(enrichedTick);
        return this;
    }
}
