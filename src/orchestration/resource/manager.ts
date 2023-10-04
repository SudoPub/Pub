/**
 * @author WMXPY
 * @namespace Orchestration_Resource
 * @description Manager
 */

import { IEspialMethod } from "../../espial/definition/method";
import { IProcedureDriver } from "../../procedure/definition/driver";

export class OrchestrationResourceManager {

    public static fromScratch(): OrchestrationResourceManager {

        return new OrchestrationResourceManager();
    }

    private readonly _espialMethods: Map<string, IEspialMethod>;
    private readonly _procedureDrivers: Map<string, IProcedureDriver>;

    private constructor() {

        this._espialMethods = new Map<string, IEspialMethod>();
        this._procedureDrivers = new Map<string, IProcedureDriver>();
    }
}
