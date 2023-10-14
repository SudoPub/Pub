/**
 * @author WMXPY
 * @namespace Record
 * @description Record
 */

import { UUIDVersion1 } from "@sudoo/uuid";
import { PubCachedWorkflowConfiguration } from "../workflow/cache/configuration";
import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { PubRecordProjection } from "./definition/projection";
import { PubRecordRealizationMap } from "./definition/realization";

export class PubRecord {

    public static fromWorkflowConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecord {

        return new PubRecord(configuration);
    }

    private readonly _cachedConfiguration: PubCachedWorkflowConfiguration;

    private readonly _identifier: string;

    private readonly _realizationMap: PubRecordRealizationMap;
    private readonly _projections: PubRecordProjection[];

    private constructor(
        configuration: PubWorkflowConfiguration
    ) {

        this._cachedConfiguration = PubCachedWorkflowConfiguration.fromWorkflowConfiguration(configuration);

        this._identifier = this._generateIdentifier();

        this._realizationMap = new Map();
        this._projections = [];
    }

    public get identifier(): string {
        return this._identifier;
    }
    public get realizationMap(): PubRecordRealizationMap {
        return this._realizationMap;
    }
    public get projections(): PubRecordProjection[] {
        return this._projections;
    }

    private _generateIdentifier(): string {

        return UUIDVersion1.generateString();
    }
}
