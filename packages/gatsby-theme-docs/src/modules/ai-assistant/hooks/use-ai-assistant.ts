import { useEffect } from 'react';
export const AI_ASSISTANT_POST_LOGIN_HASH = '__aiCfg';
export const AI_ASSISTANT_LOCALSTORAGE_POST_LOGIN_KEY =
  'ai-assistant-login-cfg';

const useAiAssistant = () => {
  useEffect(() => {
    const onHashChange = () => {
      const pageLocationHash = window.location.hash;
      if (pageLocationHash === `#${AI_ASSISTANT_POST_LOGIN_HASH}`) {
        let aiAssistantCfg;
        // check if a post login localstorage item exists
        const serializedCfg = window.localStorage.getItem(
          AI_ASSISTANT_LOCALSTORAGE_POST_LOGIN_KEY
        );
        if (serializedCfg) {
          try {
            // tries to parse the ai assistant config
            aiAssistantCfg = JSON.parse(serializedCfg);
          } catch (e) {
            // logs an error if de-serialization of ai assistant config fails
            console.error(
              'error de-serializing ai assistant config loaded from localstorage',
              e
            );
          } finally {
            // tries to remove the post login localstorage item
            window.localStorage.removeItem(
              AI_ASSISTANT_LOCALSTORAGE_POST_LOGIN_KEY
            );
          }
        }
        console.log('aiAssistantCfg', aiAssistantCfg);
      }
    };

    if (window.location.hash) {
      onHashChange();
    }

    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
};

export default useAiAssistant;
