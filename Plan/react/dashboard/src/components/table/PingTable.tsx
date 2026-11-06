import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faGlobe, faSignal } from '@fortawesome/free-solid-svg-icons';
import { usePreferences } from '../../hooks/preferences/preferencesHook';
import DataTablesTable from './DataTablesTable.jsx';
import {
    localeService,
    reverseRegionLookupMap,
} from '../../service/localeService.js';
import { usePingFormatter } from '../../util/format/usePingFormatter';
import { useDecimalFormatter } from '../../util/format/useDecimalFormatter';

export type CountryPing = {
    country: string;
    avgPing: number;
    minPing: number;
    maxPing: number;
};

type Props = {
    countries: CountryPing[];
};

const PingTable = ({ countries }: Props) => {
    const { t } = useTranslation();
    const { preferencesLoaded } = usePreferences();
    const { formatPing } = usePingFormatter();
    const { formatDecimals } = useDecimalFormatter();

    const columns = [
        {
            title: (
                <>
                    <Fa icon={faGlobe} /> {t('html.label.country')}
                </>
            ),
            data: 'country',
        },
        {
            title: (
                <>
                    <Fa icon={faSignal} /> {t('html.label.averagePing')}
                </>
            ),
            data: { _: 'pingAverage', display: 'pingAverageFormatted' },
        },
        {
            title: (
                <>
                    <Fa icon={faSignal} /> {t('html.label.bestPing')}
                </>
            ),
            data: { _: 'pingMin', display: 'pingMinFormatted' },
        },
        {
            title: (
                <>
                    <Fa icon={faSignal} /> {t('html.label.worstPing')}
                </>
            ),
            data: { _: 'pingMax', display: 'pingMaxFormatted' },
        },
    ];

    const regions = new Intl.DisplayNames(
        [localeService.getIntlFriendlyLocale()],
        { type: 'region' },
    );

    const rows = countries.map((country) => {
        const code = (reverseRegionLookupMap as Record<string, string>)[
            country.country
        ];
        const location = code
            ? regions.of(code)
            : country.country.replace(
                  'Local Machine',
                  t('html.value.localMachine'),
              );
        return {
            country: location,
            pingAverage: country.avgPing,
            pingAverageFormatted: formatPing(formatDecimals(country.avgPing)),
            pingMax: country.maxPing,
            pingMaxFormatted: formatPing(country.maxPing),
            pingMin: country.minPing,
            pingMinFormatted: formatPing(country.minPing),
        };
    });
    const options = {
        responsive: true,
        deferRender: true,
        columns: columns,
        data: rows,
        paginationCount: 2,
        order: [[0, 'desc']],
    };

    if (!preferencesLoaded) return <></>;

    return (
        <DataTablesTable
            id={'ping-table'}
            options={options}
            colorClass={'bg-ping'}
            rowKeyFunction={undefined}
            className={undefined}
            expandComponent={undefined}
            clickableRows={undefined}
        />
    );
};

export default PingTable;
