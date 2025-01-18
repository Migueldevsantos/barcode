import { createContext, ReactNode, useContext, useState } from "react";

type CodeBarConetxtTypes = {
    codes: string[];
    setCodes: React.Dispatch<React.SetStateAction<string[]>>;

}

export const CodeBarContext = createContext({} as CodeBarConetxtTypes);

export const CodeBarProvider = ({children}:{children: ReactNode}) => {
    const [codes, setCodes] = useState<string[]>([]);

    return (
        <CodeBarContext.Provider value={{codes, setCodes}}>
            {children}
        </CodeBarContext.Provider>
    )
}

export const useCodeBarContext = () => useContext(CodeBarContext);