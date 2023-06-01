import { User } from '@auth0/auth0-react';
import { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';

export type LearningState = {
  user: {
    profile: User | undefined;
  };
  updateProfile: (userProfile: User) => void;
};

enum LearningActionKind {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
}

interface LearningAction {
  type: LearningActionKind;
  payload: User;
}

const initialState: LearningState = {
  user: {
    profile: undefined,
  },
  updateProfile: (profile) => null,
};

export const LearningContext = createContext(initialState);

type LearningProviderProps = {
  children: ReactNode;
};

export const LearningStateProvider = ({ children }: LearningProviderProps) => {
  const [state, dispatch] = useReducer(learningReducer, initialState);

  const value = {
    ...state,
    updateProfile: (profile: User) => {
      dispatch({
        type: LearningActionKind.UPDATE_PROFILE,
        payload: profile,
      });
    },
  };

  return (
    <LearningContext.Provider value={value}>
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
    default: {
      return state;
    }
  }
}
