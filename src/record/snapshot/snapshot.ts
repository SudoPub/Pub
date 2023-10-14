/**
 * @author WMXPY
 * @namespace Record_Snapshot
 * @description Snapshot
 */

export class PubRecordSnapshot {

    public static fromScratch(): PubRecordSnapshot {

        return new PubRecordSnapshot();
    }

    private _startParameters: Record<string, any> | null;
    private readonly _previousProcedureOutcomes: Map<string, Record<string, any>>;

    private constructor() {

        this._startParameters = null;
        this._previousProcedureOutcomes = new Map();
    }

    public get startParameters(): Record<string, any> | null {
        return this._startParameters;
    }
    public get previousProcedureOutcomes(): Map<string, Record<string, any>> {
        return this._previousProcedureOutcomes;
    }

    public setStartParameters(parameters: Record<string, any>): this {

        this._startParameters = parameters;
        return this;
    }

    public setPreviousProcedureOutcome(procedureName: string, outcome: Record<string, any>): this {

        this._previousProcedureOutcomes.set(procedureName, outcome);
        return this;
    }

    public serialize(): string {

        return JSON.stringify({
            startParameters: this._startParameters,
            previousProcedureOutcomes: [
                ...this._previousProcedureOutcomes.entries(),
            ].map((entry: [string, Record<string, any>]) => ({
                procedureName: entry[0],
                outcome: entry[1],
            })),
        });
    }
}
