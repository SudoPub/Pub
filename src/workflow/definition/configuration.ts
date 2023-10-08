/**
 * @author WMXPY
 * @namespace Workflow_Definition
 * @description Configuration
 */

import { PubProcedureConfiguration } from "../../procedure/definition/configuration";

export type PubWorkflowConfiguration = {

    readonly configurationName: string;

    readonly procedures: PubProcedureConfiguration[];
};
