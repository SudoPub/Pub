/**
 * @author WMXPY
 * @namespace Orchestration_Resource
 * @description Manager
 */

import { BaseProcedureResolver } from "./procedure-resolver";

export class OrchestrationResourceManager {

    public static fromScratch(): OrchestrationResourceManager {

        return new OrchestrationResourceManager();
    }

    private readonly _procedureResolvers: Set<BaseProcedureResolver>;

    private constructor() {

        this._procedureResolvers = new Set<BaseProcedureResolver>();
    }

    public addProcedureResolver(resolver: BaseProcedureResolver): this {

        this._procedureResolvers.add(resolver);
        return this;
    }
}
