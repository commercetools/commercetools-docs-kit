import { useContext } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import ConfigContext from '../components/config-context';
import UserProfile from '../modules/sso/components/avatar';
import { AuthenticatedContextState } from '../components/authenticated-context';
import AiAssistantButton from '../modules/ai-assistant/components/ai-assistant-launch-button';
const LoginInfo = () => {
  const { hideLogin, aiAssistantTopbarButton } = useContext(ConfigContext);
  const {
    user: { profile },
  } = useContext(AuthenticatedContextState);

  // return hideLogin && !profile ? null : <UserProfile />;
  return (
    <Spacings.Inline scale="s" alignItems="center">
      {aiAssistantTopbarButton && (
        <AiAssistantButton
          label="Start Assistant"
          mode="ama-gpt4-turbo-grounded"
        />
      )}
      {hideLogin && !profile ? null : <UserProfile />}
    </Spacings.Inline>
  );
};

export default LoginInfo;
