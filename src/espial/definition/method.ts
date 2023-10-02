/**
 * @author WMXPY
 * @namespace Definition
 * @description Method
 */

export interface IEspialMethod {

    readonly methodName: string;

    initialize(): Promise<boolean>;
}
