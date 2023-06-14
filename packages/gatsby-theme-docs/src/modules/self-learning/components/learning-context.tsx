import { User } from '@auth0/auth0-react';
import { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';

export type LearningState = {
  user: {
    profile: User | undefined;
  };
  ui: {
    isProfileModalOpen: boolean;
  };
  updateProfile: (userProfile: User) => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
};

enum LearningActionKind {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
  OPEN_PROFILE_MODAL = 'OPEN_PROFILE_MODAL',
  CLOSE_PROFILE_MODAL = 'CLOSE_PROFILE_MODAL',
}

interface LearningAction {
  type: LearningActionKind;
  payload?: User;
}

const initialState: LearningState = {
  user: {
    profile: undefined,
  },
  ui: {
    isProfileModalOpen: false,
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
    updateProfile: (profile: User) => {
      dispatch({
        type: LearningActionKind.UPDATE_PROFILE,
        payload: profile,
      });
    },
    openProfileModal: () => {
      dispatch({
        type: LearningActionKind.OPEN_PROFILE_MODAL,
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
          isProfileModalOpen: true,
        },
      };
    }
    case LearningActionKind.CLOSE_PROFILE_MODAL: {
      return {
        ...state,
        ui: {
          isProfileModalOpen: false,
        },
      };
    }
    default: {
      return state;
    }
  }
}
