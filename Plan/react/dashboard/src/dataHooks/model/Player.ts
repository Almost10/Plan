import { ServerStatistics } from './ServerStatistics';
import { ExtensionData } from './extension/ExtensionData';
import { FinishedSession } from './session/FinishedSession';

export type PlayerExtensions = {
    playerUUID: string;
    serverUUID: string;
    serverName: string;
    extensionData: ExtensionData[];
};

export type Player = {
    statistics: ServerStatistics[];
    info: {
        name: string;
        uuid: string;
    };
    extensions: PlayerExtensions[];
    sessions?: FinishedSession[];
    timestamp: number;
    timestampF: string;
};
