import PropTypes from 'prop-types';
import BoxBooksIcon from '../icons/box-books.svg';
import BoxCertifiedIcon from '../icons/box-certified.svg';
import BoxGraduationIcon from '../icons/box-graduation.svg';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';

const getIconByType = (type) => {
  switch (type) {
    case 'books':
      return BoxBooksIcon;
    case 'certified':
      return BoxCertifiedIcon;
    case 'graduation':
      return BoxGraduationIcon;
    default:
      return BoxBooksIcon;
  }
};

const Content = styled.div`
  position: absolute;
  width: 334px;
  top: 0;
  margin-left: 160px;
  padding-top: 33px;
  font-size: ${designSystem.typography.fontSizes.small};
`;

const NumberContainer = styled.div`
  position: absolute;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  width: 20%;
  top: 61px;
  left: 56px;
`;

const BoxContaier = styled.div`
  position: relative;
  height: 138px;
  width: 530px;
`;

const Title = styled.h5`
  font-size: ${designSystem.typography.fontSizes.h5};
  font-weight: 600;
  margin-bottom: 10px;
`;

const SvgContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CertificationBox = (props) => {
  const { type } = props;
  const Icon = getIconByType(type);

  return (
    <BoxContaier>
      <SvgContainer>
        <Icon />
      </SvgContainer>
      <NumberContainer>{props.number}</NumberContainer>
      <Content>
        <Title>{props.title}</Title>
        <p>{props.children}</p>
      </Content>
    </BoxContaier>
  );
};

CertificationBox.propTypes = {
  type: PropTypes.string,
  number: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default CertificationBox;
