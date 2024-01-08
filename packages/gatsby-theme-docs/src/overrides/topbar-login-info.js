import { useContext } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import ConfigContext from '../components/config-context';
import UserProfile from '../modules/sso/components/avatar';
import { AuthenticatedContextState } from '../components/authenticated-context';
import AiAssistantButton from '../modules/ai-assistant/components/ai-assistant-launch-button';
import { useSiteData } from '../hooks/use-site-data';
const LoginInfo = () => {
  const siteData = useSiteData();
  const { hideLogin, aiAssistantTopbarButton } = useContext(ConfigContext);
  const {
    user: { profile },
  } = useContext(AuthenticatedContextState);

  const isSelfLearning = siteData.siteMetadata?.isSelfLearning;

  return (
    <Spacings.Inline scale="s" alignItems="center">
      {hideLogin && !profile ? null : <UserProfile />}
      {aiAssistantTopbarButton && (
        <AiAssistantButton mode="ama-gpt4-turbo-grounded" />
      )}
    </Spacings.Inline>
  );
};

export default LoginInfo;
