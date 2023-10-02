/**
 * @author WMXPY
 * @namespace Workflow_Definition
 * @description Workflow
 */

import { PubEspial } from "../../espial/definition/espial";

export type PubWorkflow = {

    readonly workflowName: string;

    readonly espials: PubEspial[];
};
