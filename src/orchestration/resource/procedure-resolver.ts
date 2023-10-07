/**
 * @author WMXPY
 * @namespace Orchestration_Resource
 * @description Procedure Resolver
 */

import { IProcedureDriver } from "../../procedure/definition/driver";

export abstract class BaseProcedureResolver {

    public abstract readonly name: string;

    public abstract resolve(): IProcedureDriver[];
}
