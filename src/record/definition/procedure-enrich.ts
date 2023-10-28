/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Procedure Enrich
 */

import { PUB_PROCEDURE_TYPE } from "../../procedure/definition/configuration";

export type PubRecordProcedureEnrichRecord =
    Record<string, PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>>;

export type PubRecordProcedureEnrich<T extends PUB_PROCEDURE_TYPE> =
    & PubRecordProcedureEnrichCommon<T>
    & PubRecordProcedureEnrichSwitch<T>;

export type PubRecordProcedureEnrichCommon<T extends PUB_PROCEDURE_TYPE> = {

    readonly procedureIdentifier: string;
    readonly procedureType: T;

    readonly enterWaypoint: string;
};

export type PubRecordProcedureEnrichSwitch<T extends PUB_PROCEDURE_TYPE> =
    T extends PUB_PROCEDURE_TYPE.START ? PubRecordProcedureEnrich_Start :
    T extends PUB_PROCEDURE_TYPE.END ? PubRecordProcedureEnrich_End :
    T extends PUB_PROCEDURE_TYPE.DRIVER ? PubRecordProcedureEnrich_Driver :
    T extends PUB_PROCEDURE_TYPE.MAP ? PubRecordProcedureEnrich_Map :
    never;

export type PubRecordProcedureEnrich_Start = {

    readonly exitWaypoint: string;
};

export type PubRecordProcedureEnrich_End = {

    // No exit waypoint
};

export type PubRecordProcedureEnrich_Driver = {

    readonly exitWaypoint: string;
};

export type PubRecordProcedureEnrich_Map = {

    readonly iterationStartWaypoint: string;
    readonly iterationEndWaypoint: string;

    readonly exitWaypoint: string;
};
