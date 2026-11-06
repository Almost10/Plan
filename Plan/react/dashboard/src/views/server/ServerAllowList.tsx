import React, { ComponentProps } from 'react';
import { useDataRequest } from '../../hooks/dataFetchHook';
import { useParams } from 'react-router';
import { fetchAllowlistBounces } from '../../service/serverService';
import ErrorView from '../ErrorView';
import { Col } from 'react-bootstrap';
import LoadIn from '../../components/animation/LoadIn';
import ExtendableRow from '../../components/layout/extension/ExtendableRow';
import { useAuth } from '../../hooks/authenticationHook';
import AllowlistBounceTableCard from '../../components/cards/server/tables/AllowlistBounceTableCard';
import { PlanDataResponse } from '../../service/PlanResponse';

type AllowlistData = {
    allowlistBounces: ComponentProps<
        typeof AllowlistBounceTableCard
    >['bounces'];
    lastSeenByUUID: ComponentProps<typeof AllowlistBounceTableCard>['lastSeen'];
};

const ServerAllowList = () => {
    const { hasPermission } = useAuth();
    const { identifier } = useParams();

    const seeBounce = hasPermission('page.server.allowlist.bounce');
    const { data, loadingError } = useDataRequest(
        fetchAllowlistBounces,
        [identifier],
        seeBounce,
    ) as unknown as PlanDataResponse<AllowlistData>;

    if (loadingError) return <ErrorView error={loadingError} />;

    return (
        <LoadIn>
            <section className='server-allowlist'>
                {seeBounce && (
                    <ExtendableRow id={'row-server-allowlist-0'}>
                        <Col md={12}>
                            <AllowlistBounceTableCard
                                bounces={data?.allowlistBounces || []}
                                lastSeen={data?.lastSeenByUUID || {}}
                            />
                        </Col>
                    </ExtendableRow>
                )}
            </section>
        </LoadIn>
    );
};

export default ServerAllowList;
