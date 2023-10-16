/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Procedure Enrich
 */

import { PUB_PROCEDURE_TYPE } from "../../procedure/definition/configuration";

export type PubRecordProcedureEnrichMap =
    Map<string, PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>>;

export type PubRecordProcedureEnrich<T extends PUB_PROCEDURE_TYPE> =
    & PubRecordProcedureEnrichCommon
    & PubRecordProcedureEnrichSwitch<T>;

export type PubRecordProcedureEnrichCommon = {

    readonly procedureIdentifier: string;

    readonly enterWaypoint: string;
};

export type PubRecordProcedureEnrichSwitch<T extends PUB_PROCEDURE_TYPE> =
    T extends PUB_PROCEDURE_TYPE.DRIVER ? PubRecordProcedureEnrich_Driver :
    T extends PUB_PROCEDURE_TYPE.MAP ? PubRecordProcedureEnrich_Map :
    never;

export type PubRecordProcedureEnrich_Driver = {

    readonly exitWaypoint: string;
};

export type PubRecordProcedureEnrich_Map = {

    readonly exitWaypoint: string;
};
