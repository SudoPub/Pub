/**
 * @author WMXPY
 * @namespace Error_Task_Factory
 * @description Invalid Procedure Type
 */

import { PubProcedureConfiguration } from "../../../procedure/definition/configuration";
import { PubTaskFactoryError } from "./factory-error";

export class PubTaskFactoryInvalidProcedureTypeError extends PubTaskFactoryError {

    public static withProcedure(
        procedure: PubProcedureConfiguration,
    ): PubTaskFactoryInvalidProcedureTypeError {

        return new PubTaskFactoryInvalidProcedureTypeError(
            `Invalid procedure type: ${procedure.type}, procedure identifier: ${procedure.identifier}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubTaskFactoryInvalidProcedureTypeError", reason);

        Object.setPrototypeOf(this, PubTaskFactoryInvalidProcedureTypeError.prototype);
    }
}
