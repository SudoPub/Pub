/**
 * @author WMXPY
 * @namespace Record
 * @description Init Simple Config
 * @override E2E Test
 */

import { expect } from 'chai';
import { PubRecord } from '../../../src';
import { justRunExample } from '../../example/just-run';

describe('Given (Record Init Simple Config) Use Case', (): void => {

    it('Should be able to init just run configuration', (): void => {

        const record: PubRecord = PubRecord.fromWorkflowConfiguration(
            justRunExample
        );

        expect(record.serialize()).to.be.exist;
    });
});
