import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import KillsTable from '../../table/KillsTable';
import { PlayerKill } from '../../../dataHooks/model/session/PlayerKill';
import React from 'react';
import { CardLoader } from '../../navigation/Loader';

type Props = {
    playerKills?: PlayerKill[];
};

const PvpKillsTableCard = ({ playerKills }: Props) => {
    const { t } = useTranslation();

    if (!playerKills) return <CardLoader />;

    return (
        <Card id={'pvp-kills-table'}>
            <Card.Header>
                <h6 className='col-text'>
                    <Fa icon={faCrosshairs} className='col-player-kills' />{' '}
                    {t('html.label.recentPvpKills')}
                </h6>
            </Card.Header>
            <KillsTable kills={playerKills} />
        </Card>
    );
};

export default PvpKillsTableCard;
