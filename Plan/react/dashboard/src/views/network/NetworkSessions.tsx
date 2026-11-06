import { Col } from 'react-bootstrap';
import React from 'react';
import ServerRecentSessionsCard from '../../components/cards/server/tables/ServerRecentSessionsCard';
import LoadIn from '../../components/animation/LoadIn';
import ExtendableRow from '../../components/layout/extension/ExtendableRow';
import { useAuth } from '../../hooks/authenticationHook';
import { NetworkSessionCalendarCard } from '../../components/cards/server/graphs/ServerSessionCalendarCard';
import SessionInsightsCard from '../../components/cards/server/insights/SessionInsightsCard';
import { GenericFilterContextProvider } from '../../dataHooks/genericFilterContextHook';
import { DateFilterControls } from '../../components/input/DateFilterControls';
import ServerPieCard from '../../components/cards/common/ServerPieCard';

const NetworkSessions = () => {
    const { hasPermission } = useAuth();
    const seeSessionList = hasPermission('page.network.sessions.list');
    const seeServerPie = hasPermission('page.network.sessions.server.pie');
    const seeInsights = hasPermission('page.network.sessions.overview');
    const seeCalendar = hasPermission('page.network.sessions.calendar');
    const seeControls = seeSessionList || seeInsights || seeServerPie;

    return (
        <LoadIn>
            <GenericFilterContextProvider>
                <section className='network-sessions'>
                    <ExtendableRow id={'row-network-sessions-0'}>
                        {
                            <Col lg={6}>
                                {seeCalendar && <NetworkSessionCalendarCard />}
                                {seeInsights && (
                                    <SessionInsightsCard
                                        identifier={undefined}
                                    />
                                )}
                            </Col>
                        }
                        <Col lg={6}>
                            {seeControls && <DateFilterControls />}
                            {seeSessionList && (
                                <ServerRecentSessionsCard
                                    identifier={undefined}
                                />
                            )}
                            {seeServerPie && <ServerPieCard />}
                        </Col>
                    </ExtendableRow>
                </section>
            </GenericFilterContextProvider>
        </LoadIn>
    );
};

export default NetworkSessions;
