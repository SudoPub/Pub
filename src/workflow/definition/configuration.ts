/**
 * @author WMXPY
 * @namespace Workflow_Definition
 * @description Configuration
 */

import { Pattern } from "@sudoo/pattern";
import { PubProcedureConfiguration } from "../../procedure/definition/configuration";

export type PubWorkflowConfiguration = {

    readonly configurationName: string;
    readonly configurationDescription?: string;

    readonly parametersPattern: Pattern;
    readonly procedures: PubProcedureConfiguration[];
};
