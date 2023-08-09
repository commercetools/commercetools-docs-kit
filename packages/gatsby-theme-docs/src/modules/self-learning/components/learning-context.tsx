import { User } from '@auth0/auth0-react';
import { createContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';

type ProfileModalConfig = {
  title: string;
  isDismissable: boolean;
};

type ChatModalConfig = {
  title: string;
  isDismissable: boolean;
  chatSelectedMode: string | undefined;
  chatAvailableModes: string[];
  messageHistory: string[] | undefined;
};

enum LearningActionKind {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  OPEN_PROFILE_MODAL = 'OPEN_PROFILE_MODAL',
  CLOSE_PROFILE_MODAL = 'CLOSE_PROFILE_MODAL',
  OPEN_CHAT_MODAL = 'OPEN_CHAT_MODAL',
  CLOSE_CHAT_MODAL = 'CLOSE_CHAT_MODAL',
}
interface LearningAction {
  type: LearningActionKind;
  payload?: User | ProfileModalConfig | ChatModalConfig;
}

const initialState: LearningContextStateType = {
  user: {
    profile: undefined,
  },
  ui: {
    profileModal: undefined,
    chatModal: undefined,
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
    case LearningActionKind.OPEN_CHAT_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          chatModal: (action.payload as ChatModalConfig) || {
            title: '',
            isDismissable: true,
            chatSelectedMode: undefined,
            messageHistory: undefined,
            chatAvailableModes: [],
          },
        },
      };
    }

    case LearningActionKind.CLOSE_CHAT_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          chatModal: undefined,
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
    chatModal: ChatModalConfig | undefined;
  };
};

// Create a new state context
const LearningContextState = createContext<LearningContextStateType>({
  user: {
    profile: undefined,
  },
  ui: {
    profileModal: undefined,
    chatModal: undefined,
  },
});

/** CONTEXT API DEFINITION */
type LearningContextApiType = {
  updateProfile: (userProfile: User) => void;
  openProfileModal: (cfg: ProfileModalConfig) => void;
  closeProfileModal: () => void;
  openChatModal: (cfg: ChatModalConfig) => void;
  closeChatModal: () => void;
};

// Create a new API context
const LearningContextApi = createContext<LearningContextApiType>({
  updateProfile: () => null,
  openProfileModal: () => null,
  closeProfileModal: () => null,
  openChatModal: () => null,
  closeChatModal: () => null,
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

    const openChatModal = (config: ChatModalConfig) => {
      dispatch({
        type: LearningActionKind.OPEN_CHAT_MODAL,
        payload: config,
      });
    };

    const closeChatModal = () => {
      dispatch({
        type: LearningActionKind.CLOSE_CHAT_MODAL,
      });
    };

    return {
      updateProfile,
      openProfileModal,
      closeProfileModal,
      openChatModal,
      closeChatModal,
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
