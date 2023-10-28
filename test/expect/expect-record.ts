/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Record
 * @override Expect
 */

import { expect } from 'chai';
import { PubRecord } from "../../src";

/* eslint-disable @typescript-eslint/no-unused-expressions */
export class ExpectRecord {

    public static with(record: PubRecord): ExpectRecord {

        return new ExpectRecord(record);
    }

    private readonly _record: PubRecord;

    private constructor(record: PubRecord) {

        this._record = record;
    }

    public get to(): this {
        return this;
    }
    public get be(): this {
        return this;
    }

    public exist(): void {

        expect(this._record).exist;
    }
}
