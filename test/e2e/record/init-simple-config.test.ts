/**
 * @author WMXPY
 * @namespace Record
 * @description Init Simple Config
 * @override E2E Test
 */

import { PubRecord } from '../../../src';
import { justRunExample } from '../../example/just-run';
import { ExpectRecord } from '../../expect/expect-record';

describe('Given (Record Init Simple Config) Use Case', (): void => {

    it('Should be able to init just run configuration', (): void => {

        const record: PubRecord = PubRecord.fromWorkflowConfiguration(
            justRunExample
        );

        ExpectRecord.with(record).exist();
    });

    it('Should be able to find start exit waypoint', (): void => {

        const record: PubRecord = PubRecord.fromWorkflowConfiguration(
            justRunExample
        );

        ExpectRecord.with(record).exist();
    });
});
