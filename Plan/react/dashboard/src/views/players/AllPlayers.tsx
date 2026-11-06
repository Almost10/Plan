import React from 'react';
import { useDataRequest } from '../../hooks/dataFetchHook';
import { fetchPlayersTable } from '../../service/serverService';
import ErrorView from '../ErrorView';
import { Col } from 'react-bootstrap';
import PlayerListCard from '../../components/cards/common/PlayerListCard';
import LoadIn from '../../components/animation/LoadIn';
import { CardLoader } from '../../components/navigation/Loader';
import ExtendableRow from '../../components/layout/extension/ExtendableRow';
import { useAuth } from '../../hooks/authenticationHook';
import { PlanDataResponse } from '../../service/PlanResponse';
import { PlayerList } from '../../components/table/PlayerTable';

const AllPlayers = () => {
    const { hasPermission } = useAuth();
    const seePlayers =
        hasPermission('page.network.players') ||
        hasPermission('access.players');
    const { data, loadingError } = useDataRequest(
        fetchPlayersTable,
        [null],
        seePlayers,
    ) as unknown as PlanDataResponse<PlayerList>;

    if (loadingError) return <ErrorView error={loadingError} />;

    return (
        <LoadIn>
            {seePlayers && (
                <ExtendableRow id={'row-player-list-0'}>
                    <Col md={12}>
                        {data ? <PlayerListCard data={data} /> : <CardLoader />}
                    </Col>
                </ExtendableRow>
            )}
        </LoadIn>
    );
};

export default AllPlayers;
