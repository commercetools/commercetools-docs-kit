import { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';

export enum EProfileState {
  UNKNOW = 'UNKNOW',
  COMPLETE = 'COMPLETE',
  INCOMPLETE = 'INCOMPLETE',
}

export type LearningState = {
  user: {
    profileState: EProfileState;
  };
  updateProfileState: (status: EProfileState) => void;
};

enum LearningActionKind {
  UPDATE_PROFILE_STATE = 'UPDATE_PROFILE_STATE',
}

interface LearningAction {
  type: LearningActionKind;
  payload: string;
}

const initialState: LearningState = {
  user: {
    profileState: EProfileState.UNKNOW,
  },
  updateProfileState: (status) => null,
};

export const LearningContext = createContext(initialState);
LearningContext.displayName = 'LearningContext';

type LearningProviderProps = {
  children: ReactNode;
};

export const LearningStateProvider = ({ children }: LearningProviderProps) => {
  const [state, dispatch] = useReducer(learningReducer, initialState);

  const value = {
    ...state,
    updateProfileState: (status: EProfileState) => {
      dispatch({
        type: LearningActionKind.UPDATE_PROFILE_STATE,
        payload: status,
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
    case LearningActionKind.UPDATE_PROFILE_STATE: {
      return {
        ...state,
        user: {
          ...state.user,
          profileState: action.payload as unknown as EProfileState,
        },
      };
    }
    default: {
      return state;
    }
  }
}
