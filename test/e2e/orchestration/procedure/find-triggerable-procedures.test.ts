/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Triggerable Procedures
 * @override E2E Test
 */

import { Optional } from '@sudoo/optional';
import { expect } from 'chai';
import { PubRecord } from '../../../../src';
import { findNextWaypoints } from '../../../../src/orchestration/waypoint/find-next-waypoints';
import { findStartExitWaypoint } from '../../../../src/orchestration/waypoint/find-start-exit-waypoint';
import { justRunExample } from '../../../example/just-run';
import { ExpectRecord } from '../../../expect/expect-record';

describe('Given (Orchestration-Procedures Find Triggerable Procedures) Use Case', (): void => {

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

        const startExitWaypoint: Optional<string> = findStartExitWaypoint(record);

        ExpectRecord
            .with(record)
            .findSnapshot()
            .findProcedureEnrichByIdentifier("START")
            .toExist()
            .toHasExitWaypoint(startExitWaypoint.getOrThrow());
    });

    it('Should be able to find start triggerable waypoints', (): void => {

        const record: PubRecord = PubRecord.fromWorkflowConfiguration(
            justRunExample,
        );

        const startExitWaypoint: Optional<string> = findStartExitWaypoint(record);
        const triggerableProcedures: string[] = findNextWaypoints(record, startExitWaypoint.getOrThrow());

        expect(triggerableProcedures).to.be.lengthOf(1);

        ExpectRecord
            .with(record)
            .findSnapshot()
            .findProcedureEnrichByIdentifier("JUST_RUN")
            .toExist()
            .toHasEnterWaypoint(triggerableProcedures[0]);
    });
});