/**
 * @author WMXPY
 * @namespace Orchestration_Waypoint
 * @description Find Next Waypoints
 */

import { PubRecordConnectionEnrich } from "../../record/definition/connection-enrich";
import { PubRecord } from "../../record/record";

export const findNextWaypoints = (
    record: PubRecord,
    waypoint: string,
): string[] => {

    const connectionEnrichWaypoints: string[] =
        Object.values(record.snapshot.connectionEnriches)
            .filter((connectionEnrich: PubRecordConnectionEnrich) => {
                return connectionEnrich.triggerWaypoint === waypoint;
            })
            .map((connectionEnrich: PubRecordConnectionEnrich) => {
                return connectionEnrich.nextWaypoint;
            });

    return connectionEnrichWaypoints;
};
