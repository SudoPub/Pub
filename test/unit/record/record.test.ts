/**
 * @author WMXPY
 * @namespace Record
 * @description Record
 * @override Unit Test
 */

import { expect } from 'chai';
import { PubRecord } from '../../../src';
import { justRunExample } from '../../example/just-run';

describe('Given {PubRecord} Class', (): void => {

    it('Should be able to init just run configuration', (): void => {

        const record: PubRecord = PubRecord.fromWorkflowConfiguration(
            justRunExample
        );

        expect(record.serialize()).to.be.exist;
    });
});
