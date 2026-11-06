import React from 'react';
import LoadIn from '../../components/animation/LoadIn';
import { Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import PerformanceAsNumbersCard from '../../components/cards/server/tables/PerformanceAsNumbersCard';
import ExtendableRow from '../../components/layout/extension/ExtendableRow';
import { useAuth } from '../../hooks/authenticationHook';
import { GraphSeriesCard } from '../../components/cards/server/graphs/GraphSeriesCard';

const ServerPerformance = () => {
    const { hasPermission, hasChildPermission } = useAuth();
    const { identifier } = useParams() as { identifier: string };

    const seeGraphs = hasChildPermission('page.server.performance.graphs');
    const seeOverview = hasPermission('page.server.performance.overview');

    return (
        <LoadIn>
            <section className='server-performance'>
                {seeGraphs && (
                    <ExtendableRow id={'row-server-performance-0'}>
                        <Col lg={12}>
                            <GraphSeriesCard
                                id='performance-graphs'
                                identifier={identifier}
                            />
                        </Col>
                    </ExtendableRow>
                )}
                {seeOverview && (
                    <ExtendableRow id={'row-server-performance-1'}>
                        <Col lg={12}>
                            <PerformanceAsNumbersCard
                                servers={[{ serverUUID: identifier }]}
                            />
                        </Col>
                    </ExtendableRow>
                )}
            </section>
        </LoadIn>
    );
};

export default ServerPerformance;
