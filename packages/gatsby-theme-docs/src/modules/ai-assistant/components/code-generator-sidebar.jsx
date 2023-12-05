import { designSystem } from '@commercetools-docs/ui-kit';
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '@commercetools-uikit/primary-button';

const BUTTONS_CONTENT = [
  {
    label: 'Step 1: Start with creating an API Client',
    button: 'Create an API client',
    text: 'Create a client using the typescript SDK v2',
  },
  {
    label: 'Step 2: Sprinkle in your Taxes configuration',
    button: 'Create Tax Categories & Rates',
    text: 'Create TaxCategory with German tax rate 19% using the typescript SDK v2',
  },
  {
    label: 'Step 3: Gather Product Types',
    button: 'Create Product Type',
    text: 'Create product type using the typescript SDK v2',
  },
  {
    label: 'Step 4: Stir in a Product',
    button: 'Add new Product',
    text: 'Create product using the typescript SDK v2',
  },
  {
    label: 'Step 5: Season with a Cart',
    button: 'Add Cart',
    text: 'Create cart using the typescript SDK v2',
  },
  {
    label: 'Step 6: Garnish an Order and serve',
    button: 'Create Order',
    text: 'Create order using the typescript SDK v2',
  },
];

const SidebarContainer = styled.div`
  font-size: ${designSystem.typography.fontSizes.small};
  line-height: ${designSystem.typography.lineHeights.body};
`;
const SidebarHeader = styled.div`
  h3 {
    font-weight: ${designSystem.typography.fontWeights['light-bold']};
  }
  p {
    margin-top: ${designSystem.dimensions.spacings.s};
  }
`;
const QuestionButtonsContainer = styled.div`
`;

const CodeGeneratorSidebar = (props) => {

  const questionClickHandler = (e, question) => {
    e.stopPropagation();
    props.onQuestionClick(question.text);
  }
  return (
    <SidebarContainer>
      <SidebarHeader>
        <h3>Generate code samples</h3>
        <p>
          Click on the buttons below to generate code snippets to place an order
          successfully from an empty project.
        </p>
      </SidebarHeader>
      <QuestionButtonsContainer>
        {BUTTONS_CONTENT.map((item, index) => (
          <QuestionButton
          key={index}
            label={item.label}
            button={item.button}
            text={item.text}
            onClick={(e) => questionClickHandler(e, item)}
          />
        ))}
      </QuestionButtonsContainer>
    </SidebarContainer>
  );
};

CodeGeneratorSidebar.propTypes = {
  onQuestionClick: PropTypes.func.isRequired
}

const QuestionItem = styled.div`
  button {
    width: 100%;
    margin-top: ${designSystem.dimensions.spacings.xs};
  }
  p {
    font-size: ${designSystem.typography.fontSizes.extraSmall};
    color: #545878;
    line-height: ${designSystem.typography.lineHeights.body};
    margin-top: ${designSystem.dimensions.spacings.m};
  }
`

const QuestionButton = (props) => {
  return (
    <QuestionItem>
      <p>{props.label}</p>
      <PrimaryButton label={props.button} size="medium" type="button" onClick={props.onClick} />
    </QuestionItem>
  );
};
QuestionButton.propTypes = {
  label: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CodeGeneratorSidebar;
