import React, { ComponentProps } from 'react';
import { Col } from 'react-bootstrap';
import { ErrorViewCard, PlanError } from '../ErrorView';
import GeolocationsCard from '../../components/cards/common/GeolocationsCard';
import PingTableCard from '../../components/cards/common/PingTableCard';
import LoadIn from '../../components/animation/LoadIn';
import ExtendableRow from '../../components/layout/extension/ExtendableRow';

type Props = {
    className: string;
    identifier?: string;
    geolocationData?: unknown;
    pingData?: ComponentProps<typeof PingTableCard>['data'];
    geolocationError?: PlanError;
    pingError?: PlanError;
    seeGeolocations: boolean;
    seePing: boolean;
};

const Geolocations = ({
    className,
    identifier,
    geolocationData,
    pingData,
    geolocationError,
    pingError,
    seeGeolocations,
    seePing,
}: Props) => {
    return (
        <LoadIn>
            <section className={className}>
                <ExtendableRow id={'row-' + className}>
                    <Col md={12}>
                        {seeGeolocations && (
                            <>
                                {geolocationError ? (
                                    <ErrorViewCard error={geolocationError} />
                                ) : (
                                    <GeolocationsCard
                                        identifier={identifier}
                                        data={geolocationData}
                                    />
                                )}
                            </>
                        )}
                        {seePing && (
                            <>
                                {pingError ? (
                                    <ErrorViewCard error={pingError} />
                                ) : (
                                    <PingTableCard data={pingData} />
                                )}
                            </>
                        )}
                    </Col>
                </ExtendableRow>
            </section>
        </LoadIn>
    );
};

export default Geolocations;
