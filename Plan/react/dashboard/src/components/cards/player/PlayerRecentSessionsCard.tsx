import React from 'react';
import RecentSessionsCard from '../common/RecentSessionsCard';
import { useGenericFilter } from '../../../dataHooks/genericFilterContextHook';
import { useSessions } from '../../../dataHooks/sessionsHooks';
import { ErrorViewCard } from '../../../views/ErrorView';
import { Player } from '../../../dataHooks/model/Player';

type Props = {
    player: Pick<Player, 'sessions'>;
};

const PlayerRecentSessionsCard = ({ player }: Props) => {
    const { after, before, player: playerUUID } = useGenericFilter();
    const { data: sessions, error: loadingError } = useSessions({
        after,
        before,
        player: playerUUID,
    });

    if (loadingError) {
        return <ErrorViewCard error={loadingError} />;
    }
    return (
        <RecentSessionsCard sessions={sessions || player.sessions} isPlayer />
    );
};

export default PlayerRecentSessionsCard;
