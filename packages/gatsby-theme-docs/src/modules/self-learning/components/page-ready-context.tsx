import { ReactNode, createContext, useMemo, useReducer } from 'react';
// reducer pattern to avoid un-necessary renders
// https://www.developerway.com/posts/how-to-write-performant-react-apps-with-context

type PageReadyApiType = {
  addAsyncItem: (item: string) => void;
  removeAsyncItem: (item: string) => void;
};

// Create a new state context
const PageReadyState = createContext<string[]>([]);

// Create a new API context
const PageReadyApi = createContext<PageReadyApiType>({
  addAsyncItem: () => null,
  removeAsyncItem: () => null,
});

type PageReadyProviderProps = {
  children: ReactNode;
};

type PageReadyActions =
  | { type: 'addItem'; item: string }
  | { type: 'removeItem'; item: string };

const reducer = (state: string[], action: PageReadyActions): string[] => {
  switch (action.type) {
    case 'addItem':
      return [...state, action.item];
    case 'removeItem':
      return state.filter((el) => el !== action.item);
  }
};

const PageReadyProvider = ({ children }: PageReadyProviderProps) => {
  const [state, dispatch] = useReducer(reducer, []);

  const api = useMemo(() => {
    const addAsyncItem = (item: string) => {
      dispatch({ type: 'addItem', item });
    };

    const removeAsyncItem = (item: string) => {
      dispatch({ type: 'removeItem', item });
    };
    return { addAsyncItem, removeAsyncItem };
  }, []);

  return (
    <PageReadyApi.Provider value={api}>
      <PageReadyState.Provider value={state}>
        {children}
      </PageReadyState.Provider>
    </PageReadyApi.Provider>
  );
};

export { PageReadyProvider, PageReadyState, PageReadyApi };
