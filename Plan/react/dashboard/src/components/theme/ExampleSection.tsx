import { SidebarUseCase } from './usecase/SidebarUseCase';
import InfoBoxUseCase from './usecase/InfoBoxUseCase';
import { ChartLoader } from '../navigation/Loader';
import TrendUseCase from './usecase/TrendUseCase';
import CardUseCase from './usecase/CardUseCase';
import CalendarUseCase from './usecase/CalendarUseCase';
import DataUseCase from './usecase/DataUseCase';
import { faChartLine, faServer } from '@fortawesome/free-solid-svg-icons';
import DataPlayUseCase from './usecase/DataPlayUseCase';
import DataPlayersUseCase from './usecase/DataPlayersUseCase';
import DataPerformanceUseCase from './usecase/DataPerformanceUseCase';
import DataCalculatedUseCase from './usecase/DataCalculatedUseCase';
import DataPlayerVersusUseCase from './usecase/DataPlayerVersusUseCase';
import DataPlayerStatusUseCase from './usecase/DataPlayerStatusUseCase';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import CollapseWithButton from '../layout/CollapseWithButton';
import FormsUseCase from './usecase/FormsUseCase.jsx';
import { addToObject } from '../../util/mutator';
import { graphUseCases } from './usecase/GraphUseCases.jsx';
import { TableUseCase } from './usecase/TableUseCases';
import { formatLabel } from './UseCase';
import TabsUseCase from './usecase/TabsUseCase';
import DataPluginsUseCase from './usecase/DataPluginsUseCase';

const findExample = (
    path: string | undefined,
    examples: Record<string, ReactNode>,
): ReactNode => {
    if (!path?.length) return undefined;
    const found = examples[path];
    if (found) return found;
    return findExample(path.split('.').slice(0, -1).join('.'), examples);
};

type Props = {
    displayedItem?: string;
    className?: string;
};

const ExampleSection = ({ displayedItem, className }: Props) => {
    const { t } = useTranslation();
    const examples: Record<string, ReactNode> = {
        sidebar: <SidebarUseCase />,
        'layout.background': <SidebarUseCase />,
        'layout.title': <SidebarUseCase />,
        tabs: <TabsUseCase />,
        infoBox: <InfoBoxUseCase />,
        'layout.loader': <ChartLoader />,
        'data.trend': <TrendUseCase />,
        cards: <CardUseCase />,
        'layout.helpIcon': <CardUseCase />,
        'layout.divider': <CardUseCase />,
        calendar: <CalendarUseCase />,
        'data.servers': <DataUseCase label={'servers'} icon={faServer} card />,
        'data.play': <DataPlayUseCase />,
        'data.players': <DataPlayersUseCase />,
        'data.playerPeakLast': (
            <DataUseCase label={'player-peak-last'} icon={faChartLine} card />
        ),
        'data.playerPeakAllTime': (
            <DataUseCase
                label={'player-peak-all-time'}
                icon={faChartLine}
                card
            />
        ),
        'data.performance': <DataPerformanceUseCase />,
        'data.calculated': <DataCalculatedUseCase />,
        'data.playerVersus': <DataPlayerVersusUseCase />,
        'data.playerStatus': <DataPlayerStatusUseCase />,
        forms: <FormsUseCase />,
        tables: <TableUseCase />,
        plugin: <DataPluginsUseCase />,
    };
    addToObject(examples, graphUseCases);
    const example = findExample(displayedItem, examples);

    const displayText = displayedItem
        ? displayedItem.split('.').map(formatLabel).join(' › ')
        : '';

    return (
        <div
            className={'example-section ' + className}
            style={{ position: 'sticky', top: '0' }}>
            <CollapseWithButton
                disabled={!example}
                open
                title={
                    <h5 className={'col-text'}>
                        {t('html.label.themeEditor.example')}
                        {example ? <> &middot; {displayText}</> : ''}
                    </h5>
                }>
                {example && <div className={'example'}>{example}</div>}
            </CollapseWithButton>
        </div>
    );
};

export default ExampleSection;
