/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Record Snapshot
 * @override Expect
 */

import { expect } from 'chai';
import { PubRecordSnapshot } from '../../src/record/snapshot/snapshot';
import { ExpectRecordProcedureEnrich } from './expect-record-procedure-enrich';
import { PubRecordProcedureEnrich } from '../../src/record/definition/procedure-enrich';
import { PUB_PROCEDURE_TYPE } from '../../src/procedure/definition/configuration';

/* eslint-disable @typescript-eslint/no-unused-expressions */
export class ExpectRecordSnapshot {

    public static with(snapshot: PubRecordSnapshot): ExpectRecordSnapshot {

        return new ExpectRecordSnapshot(snapshot);
    }

    private readonly _snapshot: PubRecordSnapshot;

    private constructor(snapshot: PubRecordSnapshot) {

        this._snapshot = snapshot;
    }

    public toExist(): this {

        expect(this._snapshot).exist;
        return this;
    }

    public findProcedureEnrichByIdentifier(
        identifier: string,
    ): ExpectRecordProcedureEnrich {

        const procedureEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>
            = this._snapshot.procedureEnriches[identifier];

        return ExpectRecordProcedureEnrich.with(procedureEnrich);
    }
}
