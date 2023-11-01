/**
 * @author WMXPY
 * @namespace Orchestration_Waypoint
 * @description Find Next Waypoint
 */

import { PubRecord } from "../../record/record";

export const findNextWaypoint = (record: PubRecord): string => {

    return record.identifier;
};
