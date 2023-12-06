import { User } from '@auth0/auth0-react';
import { createContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';

type ProfileModalConfig = {
  title: string;
  isDismissable: boolean;
};

type AiModalConfig = ProfileModalConfig;

enum LearningActionKind {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  OPEN_PROFILE_MODAL = 'OPEN_PROFILE_MODAL',
  CLOSE_PROFILE_MODAL = 'CLOSE_PROFILE_MODAL',
  OPEN_AI_ASSISTANT_MODAL = 'OPEN_AI_ASSISTANT_MODAL',
  CLOSE_AI_ASSISTANT_MODAL = 'CLOSE_AI_ASSISTANT_MODAL',
}
interface LearningAction {
  type: LearningActionKind;
  payload?: User | ProfileModalConfig | AiModalConfig;
}

const initialState: LearningContextStateType = {
  user: {
    profile: undefined,
  },
  ui: {
    profileModal: undefined,
    aiAssistantModal: undefined,
  },
};

function learningReducer(
  state: LearningContextStateType,
  action: LearningAction
): LearningContextStateType {
  switch (action.type) {
    case LearningActionKind.UPDATE_PROFILE: {
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload,
        },
      };
    }
    case LearningActionKind.OPEN_PROFILE_MODAL: {
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
    case LearningActionKind.CLOSE_PROFILE_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          profileModal: undefined,
        },
      };
    }
    case LearningActionKind.OPEN_AI_ASSISTANT_MODAL: {
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
    case LearningActionKind.CLOSE_AI_ASSISTANT_MODAL: {
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

type LearningContextProviderProps = {
  children: ReactNode;
};

/** CONTEXT STATE DEFINITION */
type LearningContextStateType = {
  user: {
    profile: User | undefined;
  };
  ui: {
    profileModal: ProfileModalConfig | undefined;
    aiAssistantModal: AiModalConfig | undefined;
  };
};

// Create a new state context
const LearningContextState = createContext<LearningContextStateType>({
  user: {
    profile: undefined,
  },
  ui: {
    profileModal: undefined,
    aiAssistantModal: undefined,
  },
});

/** CONTEXT API DEFINITION */
type LearningContextApiType = {
  updateProfile: (userProfile: User) => void;
  openProfileModal: (cfg: ProfileModalConfig) => void;
  closeProfileModal: () => void;
  openAiAssistantModal: (cfg: AiModalConfig) => void;
  closeAiAssistantModal: () => void;
};

// Create a new API context
const LearningContextApi = createContext<LearningContextApiType>({
  updateProfile: () => null,
  openProfileModal: () => null,
  closeProfileModal: () => null,
  openAiAssistantModal: () => null,
  closeAiAssistantModal: () => null,
});

const LearningContextProvider = ({
  children,
}: LearningContextProviderProps) => {
  const [state, dispatch] = useReducer(learningReducer, initialState);

  const api = useMemo(() => {
    const updateProfile = (profile: User) => {
      dispatch({
        type: LearningActionKind.UPDATE_PROFILE,
        payload: profile,
      });
    };

    const openProfileModal = (config: ProfileModalConfig) => {
      dispatch({
        type: LearningActionKind.OPEN_PROFILE_MODAL,
        payload: config,
      });
    };

    const closeProfileModal = () => {
      dispatch({
        type: LearningActionKind.CLOSE_PROFILE_MODAL,
      });
    };

    const openAiAssistantModal = (config: AiModalConfig) => {
      dispatch({
        type: LearningActionKind.OPEN_AI_ASSISTANT_MODAL,
        payload: config,
      });
    };

    const closeAiAssistantModal = () => {
      dispatch({
        type: LearningActionKind.CLOSE_AI_ASSISTANT_MODAL,
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
    <LearningContextApi.Provider value={api}>
      <LearningContextState.Provider value={state}>
        {children}
      </LearningContextState.Provider>
    </LearningContextApi.Provider>
  );
};

export { LearningContextProvider, LearningContextState, LearningContextApi };
