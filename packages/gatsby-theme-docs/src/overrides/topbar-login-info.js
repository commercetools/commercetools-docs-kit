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

  return (
    <Spacings.Inline scale="s" alignItems="center">
      {hideLogin && !profile ? null : <UserProfile />}
      {aiAssistantTopbarButton && (
        <AiAssistantButton mode="ama-gemini-grounded" />
      )}
    </Spacings.Inline>
  );
};

export default LoginInfo;
