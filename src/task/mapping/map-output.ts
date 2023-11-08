/**
 * @author WMXPY
 * @namespace Task_Mapping
 * @description Map Output
 */

import { PubConnectionParameterMapping, TaskExecuteOutput } from "@sudopub/essential";

export const mapTaskDependencyOutput = (
    mapping: PubConnectionParameterMapping,
    output: TaskExecuteOutput,
): TaskExecuteOutput => {

    const newOutput: Record<string, any> = {};

    for (const from of Object.keys(mapping)) {

        const to: string = mapping[from];
        const value: any = output[from];

        newOutput[to] = value;
    }

    return newOutput;
};
