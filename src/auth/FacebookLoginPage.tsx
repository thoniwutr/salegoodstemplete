import React from 'react'
import styled from "styled-components/";

import Text from "../ui-kit/Text";
import FacebookIcon from "@mui/icons-material/Facebook";
import ryanLogo from "../images/logo.png";
import { Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useNavigate } from "react-router";
import { FacebookAuthProvider } from "firebase/auth";
import { loginWithFacebook, logoutUser } from "../firebase/services/auth";

import { useAuth } from '../sg-context/AuthContext'

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #fff;
  width: 100%;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  z-index: 1;
  min-height: 100vh;
  background-color: #fff;
  width: 100%;
`;

const SignInWrapper = styled.div`
  min-height: 100vh;
  z-index: -1;
  background-color: #2c46b5;
  width: 100%;
  display: grid;
  place-content: center;
  text-align: center;
`;

const Card = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: white;
  box-sizing: border-box;
  box-shadow: 0 10px 12px #cfcfcf;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  padding: 20px;
`;

const ButtonWrapper = styled.div`
  text-decoration: none;
  padding: 0;
  border-radius: 2px;
  position: relative;
  background-color: #4285f4;
  height: 40px;
  margin-top: 30px;
  width: 100%;
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

const GoogleSignInIconWrapper = styled.div`
  background-color: #4285f4;
  margin: 1px 1px;
  border-radius: 1px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const GoogleTextWrapper = styled.div`
  color: white;
  display: inline-block;
  width: 100%;
  margin: 0 auto;
  top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: LexendDeca;
  font-weight: 500;
  font-size: 14px;
`;

const useStyles = makeStyles((theme) => ({
  divider: {
    background: "#fff",
  },
}));

export default function FacebookLoginPage() {
  const navigate = useNavigate();
  const { currentUser, login } = useAuth()
  const classes = useStyles();

  const responseFacebook = (response) => {
    console.log(response);
  };

  const componentClicked = () => {
    console.log("click");
  };

  
  React.useEffect(() => {
    if (currentUser) {
      navigate('/product')
    }
  }, [currentUser])

  return (
    <Wrapper>
      <SignInWrapper>
        <Card>
          <LogoWrapper>
            <img src={ryanLogo} alt="ryan" width="70" height="70" />
          </LogoWrapper>
          <Text
            size={1.8}
            weight={400}
            family="LexendDeca"
            color="#4b4b4b"
            padding="0px"
          >
            Salegoodlive Login
          </Text>
          <ButtonWrapper
            onClick={(e) => {
              e.preventDefault();
              login()
                .then((result) => {
                  // The signed-in user info.
                  const user = result.user;
                  console.log(user);
                  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                  const credential =
                    FacebookAuthProvider.credentialFromResult(result);
                  console.log(credential);
                  //redireact 
                  navigate('/product')
                })
                .catch((error) => {
                  console.log(error);

                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // The email of the user's account used.
                  const email = error.customData.email;
                  // The AuthCredential type that was used.
                  const credential =
                    FacebookAuthProvider.credentialFromError(error);

                  // ...
                });
            }}
          >
            <GoogleSignInIconWrapper>
              <FacebookIcon sx={{ m: 1, color: "#fff" }} />
            </GoogleSignInIconWrapper>
            <Divider
              orientation="vertical"
              flexItem
              classes={{ root: classes.divider }}
            />
            <GoogleTextWrapper>Facebook Login</GoogleTextWrapper>
          </ButtonWrapper>
        </Card>
      </SignInWrapper>
    </Wrapper>
  );
}
