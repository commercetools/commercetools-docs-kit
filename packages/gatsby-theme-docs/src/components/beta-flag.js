import PropTypes from 'prop-types';
import { PlanTag } from './plan-tag';

/**
 * This component stays as shorthand of the <PlanTag /> component. The configuration
 * is hardcoded to display BETA tags. This has to remain as it's exported as markdown `<Beta />` tag and
 * extensively used in the docs repo.
 */
export const BETA_HOVER_TEXT =
  'This feature is marked as beta and is subject to change. Use with caution.';

const BetaTag = (props) => {
  return (
    <PlanTag text="BETA" color="blue" overHint={BETA_HOVER_TEXT} {...props} />
  );
};

BetaTag.propTypes = {
  href: PropTypes.string,
};

export default BetaTag;
