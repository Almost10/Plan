import React from 'react';
import { ErrorViewCard } from '../../../../views/ErrorView';
import RecentSessionsCard from '../../common/RecentSessionsCard';
import { useSessions } from '../../../../dataHooks/sessionsHooks';
import { useGenericFilter } from '../../../../dataHooks/genericFilterContextHook';

type Props = {
    identifier?: string;
};

const ServerRecentSessionsCard = ({ identifier }: Props) => {
    const { after, before } = useGenericFilter();
    const { data: sessions, error: loadingError } = useSessions({
        after,
        before,
        server: identifier,
    });

    if (loadingError) return <ErrorViewCard error={loadingError} />;

    return <RecentSessionsCard sessions={sessions} isNetwork={!identifier} />;
};

export default ServerRecentSessionsCard;
