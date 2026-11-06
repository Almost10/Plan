import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

type DropdownStatusContextValue = {
    toggled: string[];
    toggle: (key: string) => void;
};

const DropdownStatusContext = createContext<DropdownStatusContextValue>(
    {} as DropdownStatusContextValue,
);

export const DropdownStatusContextProvider = ({
    children,
}: PropsWithChildren) => {
    const [toggled, setToggled] = useState<string[]>([]);

    const toggle = useCallback(
        (key: string) => {
            if (toggled.includes(key)) {
                setToggled(toggled.filter((k) => k !== key));
            } else {
                setToggled([...toggled, key]);
            }
        },
        [toggled, setToggled],
    );

    const sharedState = useMemo(() => {
        return { toggled, toggle };
    }, [toggled, toggle]);
    return (
        <DropdownStatusContext.Provider value={sharedState}>
            {children}
        </DropdownStatusContext.Provider>
    );
};

export const useDropdownStatusContext = () => {
    return useContext(DropdownStatusContext);
};
