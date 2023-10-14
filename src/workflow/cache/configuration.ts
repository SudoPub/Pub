/**
 * @author WMXPY
 * @namespace Workflow_Cache
 * @description Configuration
 */

import { PUB_CONNECTION_TYPE, PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PubProcedureConfiguration, PUB_PROCEDURE_TYPE } from "../../procedure/definition/configuration";
import { PubWorkflowConfiguration } from "../definition/configuration";

export class PubCachedWorkflowConfiguration {

    public static fromWorkflowConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubCachedWorkflowConfiguration {

        return new PubCachedWorkflowConfiguration(configuration);
    }

    private readonly _configuration: PubWorkflowConfiguration;

    private readonly _proceduresCache: Map<
        string,
        PubProcedureConfiguration<PUB_PROCEDURE_TYPE>
    >;
    private readonly _connectionsCache: Map<
        string,
        PubConnectionConfiguration<PUB_CONNECTION_TYPE>
    >;

    private constructor(
        configuration: PubWorkflowConfiguration
    ) {

        this._configuration = configuration;

        this._proceduresCache = new Map();
        this._connectionsCache = new Map();
    }

    public get configuration(): PubWorkflowConfiguration {
        return this._configuration;
    }

    public getProcedureByProcedureName(
        procedureName: string,
    ): PubProcedureConfiguration<PUB_PROCEDURE_TYPE> | null {

        if (!this._proceduresCache.has(procedureName)) {

            for (const procedure of this._configuration.procedures) {

                if (procedure.procedureName === procedureName) {
                    this._proceduresCache.set(procedureName, procedure);
                }
            }
        }

        return this._proceduresCache.get(procedureName) as PubProcedureConfiguration<PUB_PROCEDURE_TYPE> ?? null;
    }

    public getConnectionByIdentifier(
        identifier: string,
    ): PubConnectionConfiguration<PUB_CONNECTION_TYPE> | null {

        if (!this._connectionsCache.has(identifier)) {

            for (const connection of this._configuration.connections) {

                if (connection.identifier === identifier) {
                    this._connectionsCache.set(identifier, connection);
                }
            }
        }

        return this._connectionsCache.get(identifier) as PubConnectionConfiguration<PUB_CONNECTION_TYPE> ?? null;
    }
}
