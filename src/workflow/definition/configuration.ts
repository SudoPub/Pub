/**
 * @author WMXPY
 * @namespace Workflow_Definition
 * @description Configuration
 */

import { PubEspialConfiguration } from "../../espial/definition/configuration";
import { PubProcedureConfiguration } from "../../procedure/definition/configuration";

export type PubWorkflowConfiguration = {

    readonly configurationName: string;

    readonly espials: PubEspialConfiguration[];

    readonly procedures: PubProcedureConfiguration[];
};
