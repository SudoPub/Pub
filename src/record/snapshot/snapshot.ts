/**
 * @author WMXPY
 * @namespace Record_Snapshot
 * @description Snapshot
 */

import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";
import { PubRecordProcedureEnrichMap } from "../definition/procedure-enrich";
import { PubRecordRealizationMap } from "../definition/realization";
import { recordInitEnrichProcedureMap } from "../enrich/init-procedure";

export class PubRecordSnapshot {

    public static fromConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecordSnapshot {

        const procedureEnrichMap = recordInitEnrichProcedureMap(
            configuration.procedures,
        );
        const realizationMap = new Map();

        return new PubRecordSnapshot(
            procedureEnrichMap,
            realizationMap,
        );
    }

    private readonly _procedureEnrichMap: PubRecordProcedureEnrichMap;
    private readonly _realizationMap: PubRecordRealizationMap;

    private constructor(
        procedureEnrichMap: PubRecordProcedureEnrichMap,
        realizationMap: PubRecordRealizationMap,
    ) {

        this._procedureEnrichMap = procedureEnrichMap;
        this._realizationMap = realizationMap;
    }

    public get procedureEnrichMap(): PubRecordProcedureEnrichMap {
        return this._procedureEnrichMap;
    }
    public get realizationMap(): PubRecordRealizationMap {
        return this._realizationMap;
    }
}
