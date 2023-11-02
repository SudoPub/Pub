/**
 * @author WMXPY
 * @namespace Expect
 * @description Expect Record Procedure Enrich
 * @override Expect
 */

import { expect } from 'chai';
import { PUB_PROCEDURE_TYPE } from '../../src/procedure/definition/configuration';
import { PubRecordProcedureEnrich } from '../../src/record/definition/procedure-enrich';

/* eslint-disable @typescript-eslint/no-unused-expressions */
export class ExpectRecordProcedureEnrich {

    public static with(
        procedureEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>,
    ): ExpectRecordProcedureEnrich {

        return new ExpectRecordProcedureEnrich(procedureEnrich);
    }

    private readonly _procedureEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>;

    private constructor(
        procedureEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>,
    ) {

        this._procedureEnrich = procedureEnrich;
    }

    public toExist(): this {

        expect(this._procedureEnrich).exist;
        return this;
    }

    public toHasExitWaypoint(waypoint: string): this {

        const enrich: any = this._procedureEnrich;

        expect(enrich.exitWaypoint).to.be.equal(waypoint);
        return this;
    }
}
