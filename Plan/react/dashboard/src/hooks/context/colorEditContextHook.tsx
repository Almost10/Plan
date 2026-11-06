import {
    createContext,
    PropsWithChildren,
    useContext,
    useMemo,
    useState,
} from 'react';
import { hsvToHex, randomHSVColor } from '../../util/colors';
import { ColorPropertyMap } from '../../components/theme/model/ThemeConfig';

type ColorEditContextValue = {
    alreadyExists: boolean;
    name: string | undefined;
    color: string | undefined;
    deleting: boolean;
    setDeleting: (deleting: boolean) => void;
    onNameChange: (value: string) => void;
    onColorChange: (value: string) => void;
    open: boolean;
    editColor: (name: string, color: string) => void;
    finishEdit: () => void;
    discardEdit: () => void;
    editNewColor: () => void;
    deleteColor: (name: string) => void;
};

type Props = {
    colors: ColorPropertyMap;
    saveFunction: (
        name: string,
        color: string,
        previous: string | undefined,
    ) => void;
    deleteFunction: (name: string) => void;
} & PropsWithChildren;

const ColorEditContext = createContext<ColorEditContextValue>(
    {} as ColorEditContextValue,
);

export const ColorEditContextProvider = ({
    colors,
    saveFunction,
    deleteFunction,
    children,
}: Props) => {
    const [previous, setPrevious] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [color, setColor] = useState<string | undefined>('');
    const [deleting, setDeleting] = useState(false);
    const open = name !== undefined;

    const onNameChange = (value: string) => {
        setName(value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
    };

    const onColorChange = (value: string) => {
        setColor(value.toLowerCase());
    };

    const editColor = (name: string, color: string) => {
        setName(name);
        setColor(color);
        setPrevious(name);
    };

    const discardEdit = () => {
        setName(undefined);
        setColor(undefined);
        setPrevious(undefined);
    };

    const finishEdit = () => {
        if (name!.length) {
            saveFunction(name!, color!, previous);
        } else {
            saveFunction(
                'new-color-' + Math.floor(Math.random() * 1000),
                color!,
                previous,
            );
        }
        discardEdit();
    };

    const deleteColor = (name: string) => {
        deleteFunction(name);
    };

    const editNewColor = () => {
        setName('');
        setColor(hsvToHex(randomHSVColor(Math.floor(Math.random() * 100))));
    };

    const alreadyExists = previous !== name && !!colors[name!];

    const sharedState = useMemo(() => {
        return {
            alreadyExists,
            name,
            color,
            deleting,
            setDeleting,
            onNameChange,
            onColorChange,
            open,
            editColor,
            finishEdit,
            discardEdit,
            editNewColor,
            deleteColor,
        };
    }, [alreadyExists, name, color, deleting, open]);
    return (
        <ColorEditContext.Provider value={sharedState}>
            {children}
        </ColorEditContext.Provider>
    );
};

export const useColorEditContext = () => {
    return useContext(ColorEditContext);
};
