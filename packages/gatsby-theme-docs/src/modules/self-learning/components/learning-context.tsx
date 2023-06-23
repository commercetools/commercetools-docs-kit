import { User } from '@auth0/auth0-react';
import { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';

type ProfileModalConfig = {
  title: string;
  isDismissable: boolean;
};

export type LearningState = {
  user: {
    profile: User | undefined;
  };
  ui: {
    profileModal: ProfileModalConfig | undefined;
  };
  updateProfile: (userProfile: User) => void;
  openProfileModal: (cfg: ProfileModalConfig) => void;
  closeProfileModal: () => void;
};

enum LearningActionKind {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  OPEN_PROFILE_MODAL = 'OPEN_PROFILE_MODAL',
  CLOSE_PROFILE_MODAL = 'CLOSE_PROFILE_MODAL',
}

interface LearningAction {
  type: LearningActionKind;
  payload?: User | ProfileModalConfig;
}

const initialState: LearningState = {
  user: {
    profile: undefined,
  },
  ui: {
    profileModal: undefined,
  },
  updateProfile: () => null,
  openProfileModal: () => null,
  closeProfileModal: () => null,
};

export const LearningContext = createContext(initialState);

type LearningProviderProps = {
  children: ReactNode;
};

export const LearningStateProvider = ({ children }: LearningProviderProps) => {
  const [state, dispatch] = useReducer(learningReducer, initialState);

  const actions = {
    updateProfile: (payload: User) => {
      dispatch({
        type: LearningActionKind.UPDATE_PROFILE,
        payload,
      });
    },
    openProfileModal: (payload: ProfileModalConfig) => {
      dispatch({
        type: LearningActionKind.OPEN_PROFILE_MODAL,
        payload,
      });
    },
    closeProfileModal: () => {
      dispatch({
        type: LearningActionKind.CLOSE_PROFILE_MODAL,
      });
    },
  };

  return (
    <LearningContext.Provider value={{ ...state, ...actions }}>
      {children}
    </LearningContext.Provider>
  );
};

function learningReducer(
  state: LearningState,
  action: LearningAction
): LearningState {
  const { type, payload } = action;
  switch (type) {
    case LearningActionKind.UPDATE_PROFILE: {
      return {
        ...state,
        user: {
          ...state.user,
          profile: payload,
        },
      };
    }
    case LearningActionKind.OPEN_PROFILE_MODAL: {
      return {
        ...state,
        ui: {
          ...state.ui,
          profileModal: (payload as ProfileModalConfig) || {
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
    default: {
      return state;
    }
  }
}
