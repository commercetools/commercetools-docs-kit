// Temporarly location for typings. They should sit in the backend (vercel cloud functions) implementation library

/**
 * A generic list of key/value pairs to be passed through as
 * name/value parameters to the API /courses/{id}/quizzes/{quizid}/attempts/{attemptId}
 */
export type PassthroughData = {
  [key: string]: string;
};

/**
 * Paylad to be passed to the submit attempt API.
 */
export type SubmissionAttempt = {
  questions: SubmissionAttemptQuestions;
};

type SubmissionAttemptQuestions = {
  [questionId: string]: SubmissionAttemptQuestion;
};

export type SubmissionAnswerValue = {
  name: string;
  value: string | number;
};

type SubmissionAttemptQuestion = {
  passthroughData?: PassthroughData;
  value: SubmissionAnswerValue | SubmissionAnswerValue[]; // single choice /multiple choices
};
