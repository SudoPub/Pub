/**
 * @author WMXPY
 * @namespace Record
 * @description Record
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { PubRecordProjection } from "./definition/projection";
import { PubRecordRealizationMap } from "./definition/realization";

export class PubRecord {

    public static fromWorkflowConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecord {

        return new PubRecord(configuration);
    }

    private readonly _configuration: PubWorkflowConfiguration;

    private readonly _identifier: string;

    private readonly _realizationMap: PubRecordRealizationMap;
    private readonly _projections: PubRecordProjection[];

    private constructor(
        configuration: PubWorkflowConfiguration
    ) {

        this._configuration = configuration;

        this._identifier = this._generateIdentifier();

        this._realizationMap = new Map();
        this._projections = [];
    }

    public get configuration(): PubWorkflowConfiguration {
        return this._configuration;
    }
    public get identifier(): string {
        return this._identifier;
    }

    private _generateIdentifier(): string {

        return UUIDVersion1.generateString();
    }
}
