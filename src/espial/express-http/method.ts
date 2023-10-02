/**
 * @author WMXPY
 * @namespace ExpressHTTP
 * @description Method
 */

import { IEspialMethod } from "../definition/method";

export class ExpressHttpEspialMethod implements IEspialMethod {

    public readonly methodName: string = 'Express-HTTP';

    private constructor() {

        // Nothing here
    }

    public initialize(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
