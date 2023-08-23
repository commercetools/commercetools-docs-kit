import PropTypes from 'prop-types';
import planTagsConfig from '../overrides/plan-tags-config';
import PlanTagInternal from './plan-tag-internal';

const PlanTag = (props) => {
  const planConfig = planTagsConfig[props.plan];
  if (planConfig) {
    const IconComponent = planConfig.icon ? <planConfig.icon /> : undefined;
    const text = planConfig.text || '';
    const color = planConfig.color || 'green';
    return (
      <PlanTagInternal
        text={text}
        icon={IconComponent}
        color={color}
        href={planConfig.href}
        overHint={planConfig.overHint}
        inverted={props.inverted}
      />
    );
  } else {
    return null;
  }
};

PlanTag.propTypes = {
  plan: PropTypes.string,
  inverted: PropTypes.bool,
};

export default PlanTag;
