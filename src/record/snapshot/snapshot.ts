/**
 * @author WMXPY
 * @namespace Record_Snapshot
 * @description Snapshot
 */

import { convertMapToRecord } from "../../util/map-to-record";
import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";
import { PubRecordConnectionEnrichMap } from "../definition/connection-enrich";
import { PubRecordProcedureEnrichMap } from "../definition/procedure-enrich";
import { PubRecordRealizationMap } from "../definition/realization";
import { PubSerializedRecordSnapshot } from "../definition/record";
import { recordInitEnrichConnectionMap } from "../enrich/init-connection";
import { recordInitEnrichProcedureMap } from "../enrich/init-procedure";

export class PubRecordSnapshot {

    public static fromConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecordSnapshot {

        const procedureEnrichMap = recordInitEnrichProcedureMap(
            configuration.procedures,
        );
        const connectionEnrichMap = recordInitEnrichConnectionMap(
            configuration.connections,
            procedureEnrichMap,
        );
        const realizationMap = new Map();

        return new PubRecordSnapshot(
            procedureEnrichMap,
            connectionEnrichMap,
            realizationMap,
        );
    }

    public static fromSerializedSnapshot(
        snapshot: PubSerializedRecordSnapshot,
    ): PubRecordSnapshot {

        const procedureEnrichMap: PubRecordProcedureEnrichMap =
            new Map(Object.entries(snapshot.procedureEnrich));
        const connectionEnrichMap: PubRecordConnectionEnrichMap =
            new Map(Object.entries(snapshot.connectionEnrich));
        const realizationMap: PubRecordRealizationMap =
            new Map(Object.entries(snapshot.realizationMap));

        return new PubRecordSnapshot(
            procedureEnrichMap,
            connectionEnrichMap,
            realizationMap,
        );
    }

    private readonly _procedureEnrichMap: PubRecordProcedureEnrichMap;
    private readonly _connectionEnrichMap: PubRecordConnectionEnrichMap;
    private readonly _realizationMap: PubRecordRealizationMap;

    private constructor(
        procedureEnrichMap: PubRecordProcedureEnrichMap,
        connectionEnrichMap: PubRecordConnectionEnrichMap,
        realizationMap: PubRecordRealizationMap,
    ) {

        this._procedureEnrichMap = procedureEnrichMap;
        this._connectionEnrichMap = connectionEnrichMap;
        this._realizationMap = realizationMap;
    }

    public get procedureEnrichMap(): PubRecordProcedureEnrichMap {
        return this._procedureEnrichMap;
    }
    public get connectionEnrichMap(): PubRecordConnectionEnrichMap {
        return this._connectionEnrichMap;
    }
    public get realizationMap(): PubRecordRealizationMap {
        return this._realizationMap;
    }

    public serialize(): PubSerializedRecordSnapshot {

        return {
            procedureEnrich: convertMapToRecord(this._procedureEnrichMap),
            connectionEnrich: convertMapToRecord(this._connectionEnrichMap),
            realizationMap: convertMapToRecord(this._realizationMap),
        };
    }
}
