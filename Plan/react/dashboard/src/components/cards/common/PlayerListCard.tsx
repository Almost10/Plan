import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import PlayerTable, { PlayerList } from '../../table/PlayerTable';

type Props = {
    data?: PlayerList;
    title?: string;
    orderBy?: number;
};

const PlayerListCard = ({ data, title, orderBy }: Props) => {
    const { t } = useTranslation();

    return (
        <Card>
            <Card.Header>
                <h6 className='col-text'>
                    <Fa icon={faUsers} className='col-players-count' />{' '}
                    {title || t('html.label.playerList')}
                </h6>
            </Card.Header>
            <PlayerTable data={data} orderBy={orderBy} />
        </Card>
    );
};

export default PlayerListCard;
