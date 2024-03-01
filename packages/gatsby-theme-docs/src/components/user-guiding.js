import PropTypes from 'prop-types';
import { Script } from 'gatsby';

const UserGuiding = (props) => {
  return props.ugId ? (
    <Script
      src={`https://static.userguiding.com/media/user-guiding-${props.ugId}-embedded.js`}
    />
  ) : null;
};

UserGuiding.propTypes = {
  ugId: PropTypes.string,
};

export default UserGuiding;
