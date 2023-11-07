/**
 * @author WMXPY
 * @namespace Snapshot
 * @description Snapshot
 */

import { PubWorkflowConfiguration } from "../workflow/definition/configuration";
import { PubSnapshotTask } from "./task";

export type PubSnapshot = {

    readonly configuration: PubWorkflowConfiguration;

    readonly tasks: PubSnapshotTask[];
};
