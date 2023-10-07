/**
 * @author WMXPY
 * @namespace Record_Serialize
 * @description Serialize
 */

import { PubRecord } from "../definition/record";

export const serializePubRecord = (record: PubRecord): string => {

    return JSON.stringify(record);
};
