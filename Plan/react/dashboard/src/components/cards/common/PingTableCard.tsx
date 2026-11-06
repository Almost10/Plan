import React from 'react';
import { Card } from 'react-bootstrap';
import CardHeader from '../CardHeader';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import PingTable, { CountryPing } from '../../table/PingTable';
import { ChartLoader } from '../../navigation/Loader';

type Props = {
    data?: {
        table?: CountryPing[];
    };
};

const PingTableCard = ({ data }: Props) => {
    return (
        <Card id={'ping-per-country'}>
            <CardHeader
                icon={faWifi}
                color='geolocation'
                label={'html.label.connectionInfo'}
            />
            {data && <PingTable countries={data?.table || []} />}
            {!data && <ChartLoader />}
        </Card>
    );
};

export default PingTableCard;
