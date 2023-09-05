import { createContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

const SET_EXPANDED_CHAPTERS = 'SET_EXPANDED_CHAPTERS';

const SidebarContextState = createContext({
  expandedChapters: [],
});

const SidebarContextApi = createContext({
  setExpandedChapters: () => null,
});

const initialState = {
  expandedChapters: [],
};

function sidebarReducer(state, action) {
  switch (action.type) {
    case SET_EXPANDED_CHAPTERS:
      return {
        expandedChapters: action.payload,
      };
    default: {
      return state;
    }
  }
}

const SidebarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  const api = useMemo(() => {
    const setExpandedChapters = (chapters) => {
      dispatch({ type: SET_EXPANDED_CHAPTERS, payload: chapters });
    };
    return { setExpandedChapters };
  }, []);

  return (
    <SidebarContextApi.Provider value={api}>
      <SidebarContextState.Provider value={state}>
        {children}
      </SidebarContextState.Provider>
    </SidebarContextApi.Provider>
  );
};

SidebarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SidebarContextProvider, SidebarContextState, SidebarContextApi };
