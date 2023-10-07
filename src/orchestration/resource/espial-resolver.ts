/**
 * @author WMXPY
 * @namespace Orchestration_Resource
 * @description Espial Resolver
 */

import { IEspialMethod } from "../../espial/definition/method";

export abstract class BaseEspialResolver {

    public abstract readonly name: string;

    public abstract resolve(): IEspialMethod[];
}
