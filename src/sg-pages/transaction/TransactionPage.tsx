import React from "react";
import styled from "styled-components";
import Text from "../../ui-kit/Text";

import { collection, deleteDoc, getDocs, query, where, doc, onSnapshot } from "firebase/firestore"; 

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0px 50px 50px 0px;
`;


const TitleWrapper = styled.div`
  padding: 20px 0 0 0;
  background-color: white;
  width: 100%;
  align-items: center;
  vertical-align: middle;
  text-align: center;
  display: flex;
`;



export default function TransactionPage() {


    const fetchTransaction = () => {

    }



    return   (
        <Wrapper>
        <TitleWrapper>
          <Text size={1.5} weight={500} family="LexendDeca">
            Transaction
          </Text>
        </TitleWrapper>
      </Wrapper>
    )
}