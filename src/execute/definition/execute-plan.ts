/**
 * @author WMXPY
 * @namespace Execute_Definition
 * @description Execute Plan
 */

export type PubExecutePlanBatch = {

    readonly procedureIdentifier: string;
};

export type PubExecutePlan = {

    readonly batches: PubExecutePlanBatch[];
};
