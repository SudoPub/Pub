/**
 * @author WMXPY
 * @namespace Definition
 * @description Record Mapping
 */

export enum PUB_WORKFLOW_RECORD_MAPPING_TYPE {

    ESPIAL = "ESPIAL",
    PROCEDURE = "PROCEDURE",
}

export type PubWorkflowRecordMappingElement =
    & PubWorkflowRecordMappingElementCommon
    & PubWorkflowRecordMappingElementSwitch;

export type PubWorkflowRecordMappingElementCommon = {

    readonly procedureName: string;
};

export type PubWorkflowRecordMappingElementSwitch =
    | PubWorkflowRecordMappingElementEspial
    | PubWorkflowRecordMappingElementProcedure;

export type PubWorkflowRecordMappingElementEspial = {

    readonly type: PUB_WORKFLOW_RECORD_MAPPING_TYPE.ESPIAL;
};

export type PubWorkflowRecordMappingElementProcedure = {

    readonly type: PUB_WORKFLOW_RECORD_MAPPING_TYPE.PROCEDURE;
};
