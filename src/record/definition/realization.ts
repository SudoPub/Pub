/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Realization
 */

import { PUB_PROCEDURE_TYPE } from "../../procedure/definition/configuration";

export type PubRealizationOutcome = Record<string, any>;

export type PubRecordRealizationMap = Map<string, PubRecordRealization<PUB_PROCEDURE_TYPE>>;

export type PubRecordRealizationRecord = Record<string, PubRecordRealization<PUB_PROCEDURE_TYPE>>;

export type PubRecordRealization<T extends PUB_PROCEDURE_TYPE> =
    PubRecordRealizationCommon &
    PubRecordRealizationSwitch<T>;

export type PubRecordRealizationCommon = {

    readonly startTime: Date;
    readonly endTime?: Date;
};

export type PubRecordRealizationSwitch<T extends PUB_PROCEDURE_TYPE> =
    T extends PUB_PROCEDURE_TYPE.START ? PubRecordRealization_Start :
    T extends PUB_PROCEDURE_TYPE.END ? PubRecordRealization_End :
    T extends PUB_PROCEDURE_TYPE.DRIVER ? PubRecordRealization_Driver :
    T extends PUB_PROCEDURE_TYPE.MAP ? PubRecordRealization_Map :
    never;


export type PubRecordRealization_Start = {

    readonly parameters: PubRealizationOutcome;
};

export type PubRecordRealization_End = {

    readonly outcome: PubRealizationOutcome;
};

export type PubRecordRealization_Driver = {

    readonly parameters: PubRealizationOutcome;
    readonly outcome: PubRealizationOutcome;
};

export type PubRecordRealization_Map = {

    readonly parameters: PubRealizationOutcome;
    readonly outcome: PubRealizationOutcome;
};
