export type ApiCallResult<Type> = {
  errors?: ApiCallResultError[];
  result: Type;
};

export type ApiCallResultError = {
  type: string;
  message: string;
};

//  /courses/  -> for enrolled courses
export type EnrolledCourses = {
  enrolledCourses: Course[];
};
export type Course = {
  id: number;
  status: CourseStatus;
};
//  /courses/{course-id}  -> for course content
export type CourseWithDetails = Course &
  CourseCompletionStatus & {
    topics: CourseTopic[];
  };

export type CourseCompletionStatus = Course & {
  aggregation: 'any' | 'all';
  completionCriteria: ActivityCompletionCriteria[];
  competencies: Competency[];
};

export type CourseStatus = 'inProgress' | 'completed';

export type Competency = {
  shortname: string;
  idnumber: string;
  id: number;
  description: string;
};

type ActivityCompletionCriteria = {
  type: ActivityCompletionCriteriaTypes;
  title: string;
  completed: boolean;
  timecompleted: number; // unix timpestamp
  criteria: string;
  requirement: string;
};
type ActivityCompletionCriteriaTypes =
  | 'self'
  | 'date'
  | 'unenrol'
  | 'activity'
  | 'duration'
  | 'grade'
  | 'role'
  | 'course';

export type CourseTopic = {
  name: string;
  visible: boolean;
  completed: boolean;
  completionText: string; // plain text format eg. "1 out of 3"
  activities: CourseActivities[];
};

type CourseActivities = {
  name: string; // needed to match activities in Moodle to MDX
  courseModuleId: number; // needed for posting manual completion
  visible: boolean; // could be used for experiemental topics in courses
  type: SupportedActivitiesType;
  completionType: CourseActivitiesCompletionType;
  completionStatus: CourseActivitiesCompletionStatus;
};

type SupportedActivitiesType = 'quiz' | 'label';
type CourseActivitiesCompletionType =
  | 'none' // 0
  | 'manual' // 1
  | 'auto'; // 2

type CourseActivitiesCompletionStatus =
  | 'none' // 0
  | 'completed' // 1
  | 'passed' // 2
  | 'failed'; // 3

// /badges
/**
 * Badge type for Mapper function that Maps MoodleBadges
 */
export type UserBadges = {
  badges: Badge[];
};
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

// POST /users/{user-id}  -> for auth0 user updates
export type Auth0UserProfile = User;
