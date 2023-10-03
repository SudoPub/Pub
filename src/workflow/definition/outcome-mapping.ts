/**
 * @author WMXPY
 * @namespace Definition
 * @description Outcome Mapping
 */

export enum PUB_WORKFLOW_OUTCOME_MAPPING_TYPE {

    SUCCEED = "SUCCEED",
    FAILED = "FAILED",
}

export type PubWorkflowOutcomeMappingElement =
    & PubWorkflowOutcomeMappingElementCommon
    & PubWorkflowOutcomeMappingElementSwitch;

export type PubWorkflowOutcomeMappingElementCommon = {

    readonly procedureName: string;
};

export type PubWorkflowOutcomeMappingElementSwitch =
    | PubWorkflowOutcomeMappingElementSucceed
    | PubWorkflowOutcomeMappingElementFailed;

export type PubWorkflowOutcomeMappingElementSucceed = {

    readonly type: PUB_WORKFLOW_OUTCOME_MAPPING_TYPE.SUCCEED;
};

export type PubWorkflowOutcomeMappingElementFailed = {

    readonly type: PUB_WORKFLOW_OUTCOME_MAPPING_TYPE.FAILED;
};
