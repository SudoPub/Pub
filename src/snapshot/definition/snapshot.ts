/**
 * @author WMXPY
 * @namespace Definition
 * @description Snapshot
 */

import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";

export type PubSnapshot = {

    readonly workflowConfiguration: PubWorkflowConfiguration;

    readonly startParameters: Record<string, any>;

    readonly pendingProcedures: PubSnapshotPendingProcedure[];
};

export type PubSnapshotPendingProcedure = {

    readonly identifier: string;
};
