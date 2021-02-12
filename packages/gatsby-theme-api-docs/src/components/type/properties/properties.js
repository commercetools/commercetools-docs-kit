import PropTypes from 'prop-types';
import Table from '../../table';
import Rows from './rows/rows';

const Properties = (props) => {
  if (!props.apiType.properties) {
    throw new Error('Must pass properties props to Properties component.');
  }

  return (
    <Table>
      {props.title ? (
        <thead>
          <tr>
            <th colSpan="2">{props.title}</th>
          </tr>
        </thead>
      ) : null}
      <tbody>
        <Rows {...props} />
      </tbody>
    </Table>
  );
};

Properties.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  apiKey: PropTypes.string.isRequired,
  apiType: PropTypes.object.isRequired,
  hideInheritedProperties: PropTypes.bool,
};

export default Properties;
