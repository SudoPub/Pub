/**
 * @author WMXPY
 * @namespace Marked
 * @description Driver
 */

import { IProcedureDriver } from "../definition/driver";

export class MarkedProcedureDriver implements IProcedureDriver {

    public readonly driverName: string = 'Marked';

    private constructor() {

        // Nothing here
    }
}
