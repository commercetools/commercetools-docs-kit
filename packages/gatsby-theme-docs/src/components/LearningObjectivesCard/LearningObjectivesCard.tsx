import React, { type FC, type PropsWithChildren } from 'react';
import Card from '../card';
import { CheckThinIcon } from '@commercetools-uikit/icons';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

interface LearningObjectivesCardProps {
  title: string;
}

const List = styled.ul`
  margin-top: ${designSystem.dimensions.spacings.s};
`;

const ListItem = styled.li`
  list-style: none;
  position: relative;
  padding-left: 0;
  font-size: ${designSystem.typography.fontSizes.extraSmall};
  margin-bottom: ${designSystem.dimensions.spacings.xs};

  &:last-child {
    margin-bottom: 0;
  }
`;

const LearningObjectivesCard: FC<
  PropsWithChildren<LearningObjectivesCardProps>
> = (props) => {
  return (
    <Card {...props}>
      <List>
        {React.Children.map(props.children, (child, index) => (
          <ListItem key={index}>
            <CheckThinIcon color="primary" size="20" /> {child}
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default LearningObjectivesCard;
