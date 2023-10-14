/**
 * @author WMXPY
 * @namespace Error_Execute_Configuration
 * @description Procedure Not Found
 */

import { PubExecuteConfigurationError } from "./configuration-error";

export class PubExecuteConfigurationProcedureNotFoundError extends PubExecuteConfigurationError {

    public static withIdentifier(
        procedureIdentifier: string,
    ): PubExecuteConfigurationProcedureNotFoundError {

        return new PubExecuteConfigurationProcedureNotFoundError(
            `Procedure "${procedureIdentifier}" not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubExecuteConfigurationProcedureNotFoundError", reason);

        Object.setPrototypeOf(this, PubExecuteConfigurationProcedureNotFoundError.prototype);
    }
}
