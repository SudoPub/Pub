/**
 * @author WMXPY
 * @namespace Record_Snapshot
 * @description Snapshot
 */

import { PubExecuteParameters } from "../../orchestration/definition/execute";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";

export class PubRecordSnapshot {

    public static fromScratch(): PubRecordSnapshot {

        return new PubRecordSnapshot();
    }

    private _nextProcedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE> | null;
    private _currentParameters: PubExecuteParameters;

    private constructor() {

        this._nextProcedure = null;
        this._currentParameters = {};
    }

    public get nextProcedure(): PubProcedureConfiguration<PUB_PROCEDURE_TYPE> | null {
        return this._nextProcedure;
    }
    public get currentParameters(): PubExecuteParameters {
        return this._currentParameters;
    }

    public setNextProcedure(procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE>): this {

        this._nextProcedure = procedure;
        return this;
    }

    public setCurrentParameters(parameters: PubExecuteParameters): this {

        this._currentParameters = parameters;
        return this;
    }

    public serialize(): string {

        return JSON.stringify({
            nextProcedure: this._nextProcedure,
            currentParameters: this._currentParameters,
        });
    }
}
