/**
 * @author WMXPY
 * @namespace Task_Definition
 * @description Task Manager
 */

import { Optional } from "@sudoo/optional";
import { PubTaskBase } from "../task-base";

export interface IPubTaskManager {

    readonly tasks: PubTaskBase[];

    getTaskByIdentifier(identifier: string): Optional<PubTaskBase>;
}
