/**
 * @author WMXPY
 * @namespace Definition
 * @description Snapshot
 */

import { PubWorkflowConfiguration } from "../../workflow/definition/configuration";

export type PubSnapshot = {

    readonly _workflowConfiguration: PubWorkflowConfiguration;

    readonly startParameters: Record<string, any>;
};
