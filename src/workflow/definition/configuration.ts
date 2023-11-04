/**
 * @author WMXPY
 * @namespace Workflow_Definition
 * @description Configuration
 */

import { PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";

export type PubWorkflowConfiguration = {

    readonly workflowName: string;
    readonly workflowDescription?: string;

    readonly procedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>>;
    readonly connections: PubConnectionConfiguration[];
};
