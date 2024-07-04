import PropTypes from 'prop-types';
import Parameters from './parameters';

function transformQueryParameterDescriptions(queryParameters) {
  return queryParameters.map((parameter) => {
    if (parameter.type === 'array' && parameter.items) {
      parameter.additionalDescription =
        'The parameter can be passed multiple times.';
    }

    return parameter;
  });
}

function QueryParameters(props) {
  const parameters = transformQueryParameterDescriptions(props.queryParameters);
  return (
    <Parameters
      apiKey={props.apiKey}
      title={props.title}
      parameters={parameters}
    />
  );
}

QueryParameters.propTypes = {
  apiKey: PropTypes.string,
  title: PropTypes.string,
  queryParameters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool,
      default: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.shape({
        type: PropTypes.string,
      }),
    }).isRequired
  ).isRequired,
};
QueryParameters.displayName = 'QueryParameters';

export default QueryParameters;
