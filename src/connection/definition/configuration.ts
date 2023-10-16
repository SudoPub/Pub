/**
 * @author WMXPY
 * @namespace Definition
 * @description Configuration
 */

export type PubConnectionConfiguration = {

    readonly identifier: string;

    readonly triggerWaypoint: string;
    readonly targetWaypoint: string;

    readonly parametersMapping: Record<string, string>;
};
