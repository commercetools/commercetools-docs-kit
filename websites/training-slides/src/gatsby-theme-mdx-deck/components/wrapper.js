/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useDeck } from 'gatsby-theme-mdx-deck';
import CtProvider from '../../provider';

const Wrapper = (props) => {
  const { theme } = useDeck();
  const { Provider = CtProvider } = theme;

  return (
    <Provider>
      <div {...props} />
    </Provider>
  );
};

export default Wrapper;
