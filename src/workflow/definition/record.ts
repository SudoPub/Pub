/**
 * @author WMXPY
 * @namespace Definition
 * @description Record
 */

import { PubWorkflowConfiguration } from "./configuration";
import { PubWorkflowRecordMappingElement } from "./record-mapping";

export type PubWorkflowRecordOutcome = Record<string, any>;

export type PubWorkflowRecord = {

    readonly configuration: PubWorkflowConfiguration;

    readonly identifierMapping: Record<string, PubWorkflowRecordMappingElement>;
    readonly outcomeMapping: Record<string, PubWorkflowRecordOutcome>;
};
