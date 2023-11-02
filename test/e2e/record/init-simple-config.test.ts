/**
 * @author WMXPY
 * @namespace Record
 * @description Init Simple Config
 * @override E2E Test
 */

import { Optional } from '@sudoo/optional';
import { PubRecord } from '../../../src';
import { findStartExitWaypoint } from '../../../src/orchestration/waypoint/find-start-exit-waypoint';
import { justRunExample } from '../../example/just-run';
import { ExpectRecord } from '../../expect/expect-record';

describe('Given (Record Init Simple Config) Use Case', (): void => {

    it('Should be able to init just run configuration', (): void => {

        const record: PubRecord = PubRecord.fromWorkflowConfiguration(
            justRunExample,
        );

        ExpectRecord.with(record).toExist();
    });

    it('Should be able to find start exit waypoint', (): void => {

        const record: PubRecord = PubRecord.fromWorkflowConfiguration(
            justRunExample,
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const startExitWaypoint: Optional<string> = findStartExitWaypoint(record);

        ExpectRecord
            .with(record)
            .getSnapshot()
            .findProcedureEnrichByIdentifier("START")
            .toExist()
            .toHasExitWaypoint(startExitWaypoint.getOrThrow());
    });
});
