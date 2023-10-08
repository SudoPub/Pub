/**
 * @author WMXPY
 * @namespace Record_Serialize
 * @description Deserialize
 */

import { PubRecord } from "../record";

export const deserializePubRecord = (rawRecord: string): PubRecord => {

    return JSON.parse(rawRecord);
};
