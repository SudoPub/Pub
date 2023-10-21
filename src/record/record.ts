/**
 * @author WMXPY
 * @namespace Record
 * @description Record
 */

import { generateIdentifier } from "../util/identifier";
import { PubCachedWorkflowConfiguration } from "../workflow/cache/configuration";
import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { PubSerializedRecord } from "./definition/record";
import { PubRecordSnapshot } from "./snapshot/snapshot";

export class PubRecord {

    public static fromWorkflowConfiguration(
        configuration: PubWorkflowConfiguration,
    ): PubRecord {

        const snapshot: PubRecordSnapshot =
            PubRecordSnapshot.fromConfiguration(configuration);

        return new PubRecord(
            configuration,
            snapshot,
        );
    }

    public static fromSerializedRecord(
        record: PubSerializedRecord,
    ): PubRecord {

        const snapshot: PubRecordSnapshot =
            PubRecordSnapshot.fromSerializedSnapshot(record.snapshot);

        return new PubRecord(
            record.configuration,
            snapshot,
        );
    }

    private readonly _identifier: string;

    private readonly _cachedConfiguration: PubCachedWorkflowConfiguration;
    private readonly _snapshot: PubRecordSnapshot;

    private constructor(
        configuration: PubWorkflowConfiguration,
        snapshot: PubRecordSnapshot,
    ) {

        this._cachedConfiguration = PubCachedWorkflowConfiguration.fromWorkflowConfiguration(configuration);

        this._identifier = generateIdentifier();
        this._snapshot = snapshot;
    }

    public get cachedConfiguration(): PubCachedWorkflowConfiguration {
        return this._cachedConfiguration;
    }
    public get identifier(): string {
        return this._identifier;
    }

    public serialize(): PubSerializedRecord {

        return {
            configuration: this._cachedConfiguration.configuration,
            snapshot: this._snapshot.serialize(),
        };
    }
}
