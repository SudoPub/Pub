/**
 * @author WMXPY
 * @namespace Definition
 * @description Record
 */

import { PubWorkflowConfiguration } from "./configuration";
import { PubWorkflowOutcomeMappingElement } from "./outcome-mapping";
import { PubWorkflowRecordMappingElement } from "./record-mapping";

export type PubWorkflowRecord = {

    readonly configuration: PubWorkflowConfiguration;

    readonly identifierMapping: Record<string, PubWorkflowRecordMappingElement>;
    readonly outcomeMapping: Record<string, PubWorkflowOutcomeMappingElement>;
};
