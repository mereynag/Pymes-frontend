import { Typography } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

const TitleStyled = styled(Title)`
  color: #4d5768 !important;
`;

const TextStyled = styled(Text)`
  color: #4d5768 !important;
`;

export const TitleS = (props) => <TitleStyled {...props} />;
export const TextS = (props) => <TextStyled {...props} />;
