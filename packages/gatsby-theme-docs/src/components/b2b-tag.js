import PropTypes from 'prop-types';
import { PlanTag } from './plan-tag';
import { Icons } from '@commercetools-docs/ui-kit';

/**
 * This component stays as shorthand of the <PlanTag /> component. The configuration
 * is hardcoded to display B2B tags.
 */
export const B2B_HOVER_TEXT = 'TBD';

const B2bTag = (props) => {
  return (
    <PlanTag
      text="B2B"
      color="green"
      icon={<Icons.B2BTagSvgIcon />}
      overHint={B2B_HOVER_TEXT}
      {...props}
    />
  );
};

B2bTag.propTypes = {
  href: PropTypes.string,
};

export default B2bTag;
