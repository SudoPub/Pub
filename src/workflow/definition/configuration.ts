/**
 * @author WMXPY
 * @namespace Workflow_Definition
 * @description Configuration
 */

import { PubEspial } from "../../espial/definition/espial";

export type PubWorkflowConfiguration = {

    readonly configurationName: string;

    readonly espials: PubEspial[];

    readonly procedures: string[];
};
