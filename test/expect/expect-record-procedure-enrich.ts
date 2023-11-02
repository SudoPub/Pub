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

    public toNotExist(): this {

        expect(this._procedureEnrich).not.exist;
        return this;
    }

    public toHasIdentifier(identifier: string): this {

        expect(this._procedureEnrich.procedureIdentifier).to.be.equal(identifier);
        return this;
    }

    public toHasType(type: PUB_PROCEDURE_TYPE): this {

        expect(this._procedureEnrich.procedureType).to.be.equal(type);
        return this;
    }

    public toHasEnterWaypoint(waypoint: string): this {

        const enrich: any = this._procedureEnrich;

        expect(enrich.enterWaypoint).to.be.equal(waypoint);
        return this;
    }

    public toHasExitWaypoint(waypoint: string): this {

        const enrich: any = this._procedureEnrich;

        expect(enrich.exitWaypoint).to.be.equal(waypoint);
        return this;
    }
}
