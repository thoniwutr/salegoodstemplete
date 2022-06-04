import { List, ListItem } from "@mui/material";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate, useLocation, matchPath } from "react-router";
import Text from "../ui-kit/Text";


const Wrapper = styled.div`
  display: block;
  width: 250px;
`;

const Container = styled.div`
  width: 215px;
  height: 100%;
  position: fixed;
  z-index: 1;
  overflow: hidden;
  background-color: #506be6;
`;

const LogoWrapper = styled.div`
  margin: 24px 24px;
`;

const Menus = styled.div`
  margin-top: 40px;
`;

const MainMenu = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  font-family: LexendDeca;
  font-size: 16px;
`;

const MenuDivider = styled.div`
  margin-top: 15px;
`;

const SubMenu = styled.div<{ active: boolean }>`
  width: 100%;
  color: ${(props) => (props.active ? "#00d379" : "#ffffff")};
  font-family: "LexendDeca";
  font-size: 12px;
  margin: 6px 0 6px 0;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#ffffff",
    fontFamily: "LexendDeca",
    fontSize: "14px",
    cursor: "pointer",
  },
  nested: {
    paddingLeft: "40px",
  },
  inActive: {
    background: "#506be6",
    color: "#ffffff",
    borderLeft: "5px solid #506be6",
    "&:hover, &:active": {
      borderLeft: "5px solid #00d379",
      color: "#00d379",
    },
  },
  active: {
    borderLeft: "5px solid #00d379",
    color: "#00d379",
  },
}));

const isMenuActive = (path: string) => {
  return path.includes("/fees");
};

export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu1 = () => {
    console.log("toggle1");
  };

  const toggleMenu2 = () => {
    console.log("toggle2");
  };

  return (
    <Wrapper>
      <Container>
        <LogoWrapper>
          <img
            src={logo}
            alt="ryan"
            width="31"
            height="35"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
          />
        </LogoWrapper>
        <Menus>
          <List className={classes.root}>
            <ListItem
              onClick={toggleMenu1}
              className={
                isMenuActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu>
                <Text weight={500} family="LexendDeca">
                  Product
                </Text>
              </MainMenu>
            </ListItem>
            <MenuDivider />
            <ListItem
              onClick={toggleMenu2}
              className={
                isMenuActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu> Transaction </MainMenu>
            </ListItem>
            <MenuDivider />
            <ListItem
              onClick={toggleMenu2}
              className={
                isMenuActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu> Order </MainMenu>
            </ListItem>
            <MenuDivider />
            <ListItem
              onClick={toggleMenu2}
              className={
                isMenuActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu> History </MainMenu>
            </ListItem>
            <MenuDivider />
            <ListItem
              onClick={toggleMenu2}
              className={
                isMenuActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu> User Management </MainMenu>
            </ListItem>
          </List>
        </Menus>
      </Container>
    </Wrapper>
  );
}
