/**
 * @author WMXPY
 * @namespace Workflow_Cache
 * @description Configuration
 */

import { Optional } from "@sudoo/optional";
import { PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
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
        PubConnectionConfiguration
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

    public getStartProcedure(): Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START>> {

        const startProcedure = Optional.ofUndefinable(
            this._configuration.procedures.find((procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE>) => {
                return procedure.type === PUB_PROCEDURE_TYPE.START;
            }) as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START> | undefined,
        );

        return startProcedure;
    }

    public getProcedureByIdentifier(
        identifier: string,
    ): PubProcedureConfiguration<PUB_PROCEDURE_TYPE> | null {

        if (!this._proceduresCache.has(identifier)) {

            for (const procedure of this._configuration.procedures) {

                if (procedure.identifier === identifier) {
                    this._proceduresCache.set(identifier, procedure);
                }
            }
        }

        return this._proceduresCache.get(identifier) as PubProcedureConfiguration<PUB_PROCEDURE_TYPE> ?? null;
    }

    public getConnectionByIdentifier(
        identifier: string,
    ): PubConnectionConfiguration | null {

        if (!this._connectionsCache.has(identifier)) {

            for (const connection of this._configuration.connections) {

                if (connection.identifier === identifier) {
                    this._connectionsCache.set(identifier, connection);
                }
            }
        }

        return this._connectionsCache.get(identifier) as PubConnectionConfiguration ?? null;
    }
}
