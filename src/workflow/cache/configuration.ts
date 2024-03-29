/**
 * @author WMXPY
 * @namespace Workflow_Cache
 * @description Configuration
 */

import { Optional } from "@sudoo/optional";
import { PUB_PROCEDURE_TYPE, PubConnectionConfiguration, PubProcedureConfiguration, PubWorkflowConfiguration } from "@sudopub/essential";

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
            this._configuration.procedures.find(
                (procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE>) => {

                    return procedure.type === PUB_PROCEDURE_TYPE.START;
                },
            ) as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.START> | undefined,
        );

        return startProcedure;
    }

    public getEndProcedure(): Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END>> {

        const endProcedure = Optional.ofUndefinable(
            this._configuration.procedures.find(
                (procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE>) => {

                    return procedure.type === PUB_PROCEDURE_TYPE.END;
                },
            ) as PubProcedureConfiguration<PUB_PROCEDURE_TYPE.END> | undefined,
        );

        return endProcedure;
    }

    public getProcedureByIdentifier(
        identifier: string,
    ): Optional<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>> {

        if (!this._proceduresCache.has(identifier)) {

            for (const procedure of this._configuration.procedures) {

                if (procedure.identifier === identifier) {
                    this._proceduresCache.set(identifier, procedure);
                }
            }
        }

        return Optional.ofUndefinable(this._proceduresCache.get(identifier));
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
