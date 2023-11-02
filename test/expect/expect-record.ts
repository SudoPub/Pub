/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Record
 * @override Expect
 */

import { expect } from 'chai';
import { PubRecord } from "../../src";
import { ExpectRecordSnapshot } from './expect-record-snapshot';

/* eslint-disable @typescript-eslint/no-unused-expressions */
export class ExpectRecord {

    public static with(record: PubRecord): ExpectRecord {

        return new ExpectRecord(record);
    }

    private readonly _record: PubRecord;

    private constructor(record: PubRecord) {

        this._record = record;
    }

    public toExist(): this {

        expect(this._record).exist;
        return this;
    }

    public toNotExist(): this {

        expect(this._record).not.exist;
        return this;
    }

    public findSnapshot(): ExpectRecordSnapshot {

        return ExpectRecordSnapshot.with(this._record.snapshot);
    }

    public verbose(): this {

        console.log(
            JSON.stringify(this._record.serialize(), null, 2),
        );
        return this;
    }
}
