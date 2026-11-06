import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useDataRequest } from './dataFetchHook';
import { fetchExtensionData } from '../service/serverService';
import { useAuth } from './authenticationHook';
import { ExtensionDataResponseContent } from '../dataHooks/model/extension/ExtensionData';
import { PlanError } from '../views/ErrorView';
import { PlanDataResponse } from '../service/PlanResponse';

type ServerExtensionContextValue = {
    extensionData?: ExtensionDataResponseContent;
    extensionDataLoadingError?: PlanError;
    proxy?: boolean;
};

type Props = {
    identifier?: string;
    proxy?: boolean;
} & PropsWithChildren;

const ServerExtensionContext = createContext<ServerExtensionContextValue>({});

export const ServerExtensionContextProvider = ({
    identifier,
    proxy,
    children,
}: Props) => {
    const { hasPermission } = useAuth();
    const [extensionData, setExtensionData] = useState<
        ExtensionDataResponseContent | undefined
    >(undefined);
    const [extensionDataLoadingError, setExtensionDataLoadingError] = useState<
        PlanError | undefined
    >(undefined);

    const seePlugins = hasPermission(
        proxy ? 'page.network.plugins' : 'page.server.plugins',
    );
    const { data, loadingError } = useDataRequest(
        fetchExtensionData,
        [identifier],
        seePlugins,
    ) as unknown as PlanDataResponse<ExtensionDataResponseContent>;

    useEffect(() => {
        setExtensionData(data);
        setExtensionDataLoadingError(loadingError);
    }, [data, loadingError, setExtensionData, setExtensionDataLoadingError]);

    const sharedState = useMemo(() => {
        return { extensionData, extensionDataLoadingError, proxy };
    }, [extensionData, extensionDataLoadingError, proxy]);
    return (
        <ServerExtensionContext.Provider value={sharedState}>
            {children}
        </ServerExtensionContext.Provider>
    );
};

export const useServerExtensionContext = () => {
    return useContext(ServerExtensionContext);
};
