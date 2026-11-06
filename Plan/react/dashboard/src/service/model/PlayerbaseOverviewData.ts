import { ComponentProps } from 'react';
import PlayerbaseTrendsCard from '../../components/cards/server/tables/PlayerbaseTrendsCard';
import PlayerbaseInsightsCard from '../../components/cards/server/insights/PlayerbaseInsightsCard';

export type PlayerbaseOverviewData = {
    trends: ComponentProps<typeof PlayerbaseTrendsCard>['data'];
    insights: ComponentProps<typeof PlayerbaseInsightsCard>['data'];
};
