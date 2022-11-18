import styled from "styled-components/native";

import { Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === "android";

const currentHeight = StatusBar.currentHeight;

export const Container = styled.SafeAreaView`
    margin-top: ${isAndroid ? `${currentHeight}px` : 0};
    flex: 1;
    background-color: #fafafa;
`;

export const CategoriesContainer = styled.View`
    height: 73px;
    margin-top: 34px;
`;

export const MenuContainer = styled.View`
    flex: 1;
`;

export const Footer = styled.View`
    min-height: 110px;
    background-color: #fff;
    padding: 16px 24px;
`;

export const FooterContainer = styled.View`
`;

export const CenteredContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;