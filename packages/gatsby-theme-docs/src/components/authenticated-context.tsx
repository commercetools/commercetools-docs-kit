import { User } from '@auth0/auth0-react';
import { createContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';

type ProfileModalConfig = {
  title: string;
  isDismissable: boolean;
};

type AiModalConfig = ProfileModalConfig;

enum AuthenticatedActionKind {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  OPEN_PROFILE_MODAL = 'OPEN_PROFILE_MODAL',
  CLOSE_PROFILE_MODAL = 'CLOSE_PROFILE_MODAL',
  OPEN_AI_ASSISTANT_MODAL = 'OPEN_AI_ASSISTANT_MODAL',
  CLOSE_AI_ASSISTANT_MODAL = 'CLOSE_AI_ASSISTANT_MODAL',
}
interface AuthenticatedAction {
  type: AuthenticatedActionKind;
  payload?: User | ProfileModalConfig | AiModalConfig;
}

const initialState: AuthenticatedContextStateType = {
  user: {
    profile: undefined,
  },
  ui: {
    profileModal: undefined,
    aiAssistantModal: undefined,
  },
};

function authenticatedReducer(
  state: AuthenticatedContextStateType,
  action: AuthenticatedAction
): AuthenticatedContextStateType {
  switch (action.type) {
    case AuthenticatedActionKind.UPDATE_PROFILE: {
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload,
        },
      };
    }
    case AuthenticatedActionKind.OPEN_PROFILE_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          profileModal: (action.payload as ProfileModalConfig) || {
            title: '',
            isDismissable: false,
          },
        },
      };
    }
    case AuthenticatedActionKind.CLOSE_PROFILE_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          profileModal: undefined,
        },
      };
    }
    case AuthenticatedActionKind.OPEN_AI_ASSISTANT_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          aiAssistantModal: (action.payload as AiModalConfig) || {
            title: '',
            isDismissable: true,
          },
        },
      };
    }
    case AuthenticatedActionKind.CLOSE_AI_ASSISTANT_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          aiAssistantModal: undefined,
        },
      };
    }
    default: {
      return state;
    }
  }
}

type AuthenticatedContextProviderProps = {
  children: ReactNode;
};

/** CONTEXT STATE DEFINITION */
type AuthenticatedContextStateType = {
  user: {
    profile: User | undefined;
  };
  ui: {
    profileModal: ProfileModalConfig | undefined;
    aiAssistantModal: AiModalConfig | undefined;
  };
};

// Create a new state context
const AuthenticatedContextState = createContext<AuthenticatedContextStateType>({
  user: {
    profile: undefined,
  },
  ui: {
    profileModal: undefined,
    aiAssistantModal: undefined,
  },
});

/** CONTEXT API DEFINITION */
type AuthenticatedContextApiType = {
  updateProfile: (userProfile: User) => void;
  openProfileModal: (cfg: ProfileModalConfig) => void;
  closeProfileModal: () => void;
  openAiAssistantModal: (cfg: AiModalConfig) => void;
  closeAiAssistantModal: () => void;
};

// Create a new API context
const AuthenticatedContextApi = createContext<AuthenticatedContextApiType>({
  updateProfile: () => null,
  openProfileModal: () => null,
  closeProfileModal: () => null,
  openAiAssistantModal: () => null,
  closeAiAssistantModal: () => null,
});

const AuthenticatedContextProvider = ({
  children,
}: AuthenticatedContextProviderProps) => {
  const [state, dispatch] = useReducer(authenticatedReducer, initialState);

  const api = useMemo(() => {
    const updateProfile = (profile: User) => {
      dispatch({
        type: AuthenticatedActionKind.UPDATE_PROFILE,
        payload: profile,
      });
    };

    const openProfileModal = (config: ProfileModalConfig) => {
      dispatch({
        type: AuthenticatedActionKind.OPEN_PROFILE_MODAL,
        payload: config,
      });
    };

    const closeProfileModal = () => {
      dispatch({
        type: AuthenticatedActionKind.CLOSE_PROFILE_MODAL,
      });
    };

    const openAiAssistantModal = (config: AiModalConfig) => {
      dispatch({
        type: AuthenticatedActionKind.OPEN_AI_ASSISTANT_MODAL,
        payload: config,
      });
    };

    const closeAiAssistantModal = () => {
      dispatch({
        type: AuthenticatedActionKind.CLOSE_AI_ASSISTANT_MODAL,
      });
    };

    return {
      updateProfile,
      openProfileModal,
      closeProfileModal,
      openAiAssistantModal,
      closeAiAssistantModal,
    };
  }, []);

  return (
    <AuthenticatedContextApi.Provider value={api}>
      <AuthenticatedContextState.Provider value={state}>
        {children}
      </AuthenticatedContextState.Provider>
    </AuthenticatedContextApi.Provider>
  );
};

export {
  AuthenticatedContextProvider,
  AuthenticatedContextState,
  AuthenticatedContextApi,
};
