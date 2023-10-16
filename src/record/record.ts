/**
 * @author WMXPY
 * @namespace Record
 * @description Record
 */

import { generateIdentifier } from "../util/identifier";
import { PubCachedWorkflowConfiguration } from "../workflow/cache/configuration";
import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { PubRecordProcedureEnrichMap } from "./definition/procedure-enrich";
import { PubRecordRealizationMap } from "./definition/realization";
import { recordInitEnrichProcedureMap } from "./enrich/init-procedure";

export class PubRecord {

    public static fromWorkflowConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecord {

        return new PubRecord(configuration);
    }

    private readonly _cachedConfiguration: PubCachedWorkflowConfiguration;

    private readonly _identifier: string;

    private readonly _procedureEnrichMap: PubRecordProcedureEnrichMap;

    private readonly _realizationMap: PubRecordRealizationMap;

    private constructor(
        configuration: PubWorkflowConfiguration
    ) {

        this._cachedConfiguration = PubCachedWorkflowConfiguration.fromWorkflowConfiguration(configuration);

        this._identifier = generateIdentifier();

        this._procedureEnrichMap = recordInitEnrichProcedureMap(
            configuration.procedures,
        );

        this._realizationMap = new Map();
    }

    public get cachedConfiguration(): PubCachedWorkflowConfiguration {
        return this._cachedConfiguration;
    }
    public get identifier(): string {
        return this._identifier;
    }
}
