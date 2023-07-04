import { CourseTopic } from '../external-types';

type SelfLearningPageProps = {
  topic: CourseTopic;
};

const SelfLearningPage = (props: SelfLearningPageProps) => {
  // just dummy code for now
  return props.topic?.activities[0]?.type === 'label' &&
    props.topic?.activities[0]?.name === 'pageview'
    ? 'pageview'
    : null;
};

export default SelfLearningPage;
