/**
 * @author WMXPY
 * @namespace Orchestration_Resource
 * @description Manager
 */

import { BaseEspialResolver } from "./espial-resolver";
import { BaseProcedureResolver } from "./procedure-resolver";

export class OrchestrationResourceManager {

    public static fromScratch(): OrchestrationResourceManager {

        return new OrchestrationResourceManager();
    }

    private readonly _espialResolvers: Set<BaseEspialResolver>;
    private readonly _procedureResolvers: Set<BaseProcedureResolver>;

    private constructor() {

        this._espialResolvers = new Set<BaseEspialResolver>();
        this._procedureResolvers = new Set<BaseProcedureResolver>();
    }

    public addEspialResolver(resolver: BaseEspialResolver): this {

        this._espialResolvers.add(resolver);
        return this;
    }

    public addProcedureResolver(resolver: BaseProcedureResolver): this {

        this._procedureResolvers.add(resolver);
        return this;
    }
}
