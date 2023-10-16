/**
 * @author WMXPY
 * @namespace Workflow_Definition
 * @description Configuration
 */

import { Pattern } from "@sudoo/pattern";
import { PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";

export type PubWorkflowConfiguration = {

    readonly workflowName: string;
    readonly workflowDescription?: string;

    readonly startParametersPattern: Record<string, Pattern>;
    readonly procedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>>;
    readonly connections: PubConnectionConfiguration[];
};
