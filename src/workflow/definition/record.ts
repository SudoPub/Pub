/**
 * @author WMXPY
 * @namespace Definition
 * @description Record
 */

import { PubWorkflowConfiguration } from "./configuration";

export enum PUB_WORKFLOW_RECORD_MAPPING_TYPE {

    ESPIAL = "ESPIAL",
    PROCEDURE = "PROCEDURE",
}

export type PubWorkflowRecordMappingElement = {

    readonly type: PUB_WORKFLOW_RECORD_MAPPING_TYPE;
    readonly procedureIdentifierNameMap: Record<string, string>;
};

export type PubWorkflowRecord = {

    readonly configuration: PubWorkflowConfiguration;

    readonly mapping: PubWorkflowRecordMapping;
};
