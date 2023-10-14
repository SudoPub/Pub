/**
 * @author WMXPY
 * @namespace Error_Execute_Configuration
 * @description Connection Not Found
 */

import { PubExecuteConfigurationError } from "./configuration-error";

export class PubExecuteConfigurationConnectionNotFoundError extends PubExecuteConfigurationError {

    public static create(
        connectionIdentifier: string,
    ): PubExecuteConfigurationConnectionNotFoundError {

        return new PubExecuteConfigurationConnectionNotFoundError(
            `Connection "${connectionIdentifier}" not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "PubExecuteConfigurationConnectionNotFoundError", reason);

        Object.setPrototypeOf(this, PubExecuteConfigurationConnectionNotFoundError.prototype);
    }
}
