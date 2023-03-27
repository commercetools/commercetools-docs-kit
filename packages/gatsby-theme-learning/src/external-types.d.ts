//  /courses/  -> for enrolled courses
export type CourseStatus = 'inProgress' | 'completed';
export type Course = {
  id: number;
  fullName: string;
  status: CourseStatus;
};

//  /courses/[course-id]/status -> for completionStatus
export type CourseCompletionStatus = {
  completed: boolean;
  aggregation: 'any' | 'all';
  completions: ActivityCompletionStatus[];
  courseCompetencies: Competency[];
};

export type Competency = {
  shortname: string;
  idnumber: string;
  id: number;
  description: string;
};
type ActivityCompletionStatus = {
  type:
    | 'self'
    | 'date'
    | 'unenrol'
    | 'activity'
    | 'duration'
    | 'grade'
    | 'role'
    | 'course'
    | undefined;
  title: string;
  complete: boolean;
  timecompleted: number;
  criteria: string;
  requirement: string;
};

// /badges
/**
 * Badge type for Mapper function that Maps MoodleBadges
 */
export type Badge = {
  id: string;
  name: string;
  description: string;
  status:
    | 'inactive'
    | 'active'
    | 'inactiveLocked'
    | 'activeLocked'
    | 'archived'
    | undefined;
  dateIssued: string;
  dateExpire: string;
  email: string;
  version: string;
  language: string;
  category: string;
  imageId: string;
};

//POST /courses/{id}/quizzes/{quizid}/attempts/{attemptId}?finish=true
//POST /courses/{id}/quizzes/{quizid}/attempts?forceNew=true
export type QuizAttempt = {
  attemptId: number;
  isSubmitted: boolean; // to differenciate between fetch and submit responses
  name: string; // unformatted text to be rendered as-is
  questions: Question[];
  feedback?: Feedback;
  additionaldata?: AdditionalData[];
};

/**
 * Quiz Related Types
 */

/**
 * Single question outcome and explanatory text
 */
type Feedback = {
  text?: string; // markdown
  outcome: Outcome;
};

type AdditionalData = {
  id: string;
  title: string;
  content: string;
};

/**
 * Quiz question
 */
type Question = {
  id: string;
  text: string; // markdown
  renderType: QuestionRenderType;
  feedback?: Feedback;
  answerOptions: AnswerOption[];
  passthroughData?: PassthroughData; // optional as it's needed because of Moodle implementation, it might disappear in the future
};
/**
 * A generic list of key/value pairs to be passed through as
 * name/value parameters to the API /courses/{id}/quizzes/{quizid}/attempts/{attemptId}
 */
type PassthroughData = {
  [key: string]: string;
};
/**
 * Defines the type of question. `singleOption` refers to a multiple choice question that the user
 * is allowed to pick one of.  `multipleOption` refers to a multiple choice question that the user
 * is allowed to pick multiple of.
 */
type QuestionRenderType = 'singleOption' | 'multipleOption';
/**
 * Quiz answer
 */
type AnswerOption = {
  name: string;
  value: string;
  text: string; // markdown
  selected: boolean;
  outcome?: Outcome;
};
/**
 * If the single question outcome is correct or incorrect
 */
type Outcome = 'correct' | 'incorrect';
