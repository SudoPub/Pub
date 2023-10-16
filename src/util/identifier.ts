/**
 * @author WMXPY
 * @namespace Util
 * @description Identifier
 */

import { UUIDVersion1 } from "@sudoo/uuid";

export const generateIdentifier = (): string => {

    return UUIDVersion1.generateString();
};
