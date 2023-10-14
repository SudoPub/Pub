/**
 * @author WMXPY
 * @namespace Workflow_Definition
 * @description Configuration
 */

import { Pattern } from "@sudoo/pattern";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";

export type PubWorkflowConfiguration = {

    readonly configurationName: string;
    readonly configurationDescription?: string;

    readonly startParametersPattern: Record<string, Pattern>;
    readonly procedures: Array<PubProcedureConfiguration<PUB_PROCEDURE_TYPE>>;
};
