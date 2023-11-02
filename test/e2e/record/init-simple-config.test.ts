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
import { PubRecordProcedureEnrich } from '../../../src/record/definition/procedure-enrich';
import { PUB_PROCEDURE_TYPE } from '../../../src/procedure/definition/configuration';
import { findTriggerableProcedureEnriches } from '../../../src/orchestration/procedure/find-triggerable-procedures';

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

        const startExitWaypoint: Optional<string> = findStartExitWaypoint(record);

        ExpectRecord
            .with(record)
            .getSnapshot()
            .findProcedureEnrichByIdentifier("START")
            .toExist()
            .toHasExitWaypoint(startExitWaypoint.getOrThrow());
    });

    it.only('Should be able to find start triggerable procedures', (): void => {

        const record: PubRecord = PubRecord.fromWorkflowConfiguration(
            justRunExample,
        );

        const startExitWaypoint: Optional<string> = findStartExitWaypoint(record);
        const triggerableProcedures: Array<PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE>> = findTriggerableProcedureEnriches(record, startExitWaypoint.getOrThrow());

        console.log(triggerableProcedures);
    });
});
