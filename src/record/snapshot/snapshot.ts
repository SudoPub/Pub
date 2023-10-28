/**
 * @author WMXPY
 * @namespace Record_Snapshot
 * @description Snapshot
 */

import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";
import { PubRecordConnectionEnrichRecord } from "../definition/connection-enrich";
import { PubRecordProcedureEnrichRecord } from "../definition/procedure-enrich";
import { PubRecordRealizationRecord } from "../definition/realization";
import { PubSerializedRecordSnapshot } from "../definition/record";
import { recordInitEnrichConnectionRecord } from "../enrich/init-connection";
import { recordInitEnrichProcedureRecord } from "../enrich/init-procedure";

export class PubRecordSnapshot {

    public static fromConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecordSnapshot {

        const procedureEnrichRecord = recordInitEnrichProcedureRecord(
            configuration.procedures,
        );
        const connectionEnrichRecord = recordInitEnrichConnectionRecord(
            configuration.connections,
            procedureEnrichRecord,
        );
        const realizations = {};

        return new PubRecordSnapshot(
            procedureEnrichRecord,
            connectionEnrichRecord,
            realizations,
        );
    }

    public static fromSerializedSnapshot(
        snapshot: PubSerializedRecordSnapshot,
    ): PubRecordSnapshot {

        const procedureEnrichRecord: PubRecordProcedureEnrichRecord =
            snapshot.procedureEnriches;
        const connectionEnrichRecord: PubRecordConnectionEnrichRecord =
            snapshot.connectionEnriches;
        const realizationRecord: PubRecordRealizationRecord =
            snapshot.realizations;

        return new PubRecordSnapshot(
            procedureEnrichRecord,
            connectionEnrichRecord,
            realizationRecord,
        );
    }

    private readonly _procedureEnriches: PubRecordProcedureEnrichRecord;
    private readonly _connectionEnriches: PubRecordConnectionEnrichRecord;
    private readonly _realizations: PubRecordRealizationRecord;

    private constructor(
        procedureEnriches: PubRecordProcedureEnrichRecord,
        connectionEnriches: PubRecordConnectionEnrichRecord,
        realizations: PubRecordRealizationRecord,
    ) {

        this._procedureEnriches = procedureEnriches;
        this._connectionEnriches = connectionEnriches;
        this._realizations = realizations;
    }

    public get procedureEnriches(): PubRecordProcedureEnrichRecord {
        return this._procedureEnriches;
    }
    public get connectionEnriches(): PubRecordConnectionEnrichRecord {
        return this._connectionEnriches;
    }
    public get realizations(): PubRecordRealizationRecord {
        return this._realizations;
    }

    public serialize(): PubSerializedRecordSnapshot {

        return {
            procedureEnriches: this._procedureEnriches,
            connectionEnriches: this._connectionEnriches,
            realizations: this._realizations,
        };
    }
}
