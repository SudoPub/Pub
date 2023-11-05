/**
 * @author WMXPY
 * @namespace Task_Mapping
 * @description Map Output
 */

import { PubConnectionParameterMapping } from "../../connection/definition/configuration";
import { TaskExecuteOutput } from "../definition/task";

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
