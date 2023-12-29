import React from 'react';
import { Link } from 'gatsby';

const LegalDisclaimer = () => {
  return (
    <>
      Results are generated using generative AI and should be verified prior to
      use. By interacting with the feature, you agree to our “
      <Link href="/../offering/ai-disclaimer" target="_blank">
        AI Content Disclaimer
      </Link>
      ”.
    </>
  );
};

export default LegalDisclaimer;
