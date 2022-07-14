import React from "react";
import styled from "styled-components/macro";
import Text from "../../ui-kit/Text";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase/firebase-config";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  onSnapshot,
  documentId,
} from "firebase/firestore";
import InfoItemVertical from "../../ui-kit/InfoItemVertical";
import Input from "../../ui-kit/Input";
import { Snackbar, Alert, Stack, Divider, Box } from "@mui/material";
import { BlueButton } from "../../ui-kit/Button";
import { useAuth } from '../../sg-context/AuthContext'
import Swal from 'sweetalert2'

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: white;
  width: 100%;
  padding-right: 50px;
`;
const TopWrapper = styled.div`
  margin: 20px 0;
  background-color: white;
  justify-content: space-between;
  vertical-align: middle;
  text-align: top;
  display: flex;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled.div`
  flex: 1;
  background-color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-bottom: 60px;
  justify-content: center;
`;
const HeaderWrapper = styled.div`
  margin: 0 15px;
  background-color: white;
  justify-content: space-between;
  vertical-align: middle;
  text-align: top;
  display: flex;
`;

const SectionWrapper = styled.div`
  margin: 20px;
`;

const ContentMainWrapper = styled.div`
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  display: flex;
`;
const CardWrapper = styled.div`
  width: 760px;
  margin: 0 auto;
  padding: 15px 0;
  border-radius: 10px;
  box-shadow: 0 3px 30px 0 rgba(211, 211, 211, 0.5);
  background-color: white;
`;

const TextAreaNotes = styled.textarea`
  width: 100%;
  align-items: center;
  border: 1px solid #d6d5d5;
  border-radius: 5px;
  display: inline-flex;
  justify-content: flex-start;
  position: relative;
  vertical-align: top;
  padding: 15px;
  resize: none;
  font-family: Assistant;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }
`



export default function UserManagementPage() {
    const { currentUser} = useAuth()

  const [deliveryPrice, setDeliveryPrice] = React.useState("");
  const [bankTransferDetail, setBankTransferDetail] = React.useState("");

const getUserManagement = async () => {
    console.log('getUser')
    const userRef = query(collection(firestore, "UserManagement"), where("id", "==", `${currentUser?.uid}`));
    const findUsers = await getDocs(userRef);
    findUsers.forEach((user) => {
        var um = user.data()
        setDeliveryPrice(um.deliveryPrice)
        setBankTransferDetail(um.bankTransferDetail)
     });
}

const handleUpdateUserResponse = async () => {

    try {
        await setDoc(doc(firestore, "UserManagement", `${currentUser?.uid}`), {
            id: currentUser?.uid.toString(),
            deliveryPrice: deliveryPrice,
            bankTransferDetail: bankTransferDetail,
        });
        Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            title: 'Success',
            text: `User Management has been updated`,
            customClass: {
                confirmButton: 'popup-confirm-button',
            },})
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message,
        })
    }
  };

  React.useEffect(() => {
    getUserManagement()
  }, []);

 


  return (
    <Wrapper>
      <SectionWrapper>
        <CardWrapper>
          <HeaderWrapper>
            <TitleWrapper>
              <Text size={1.4} weight={500} family="LexendDeca">
                User Management
              </Text>
            </TitleWrapper>
          </HeaderWrapper>
          <Divider sx={{ mt: 1.5, mb: 1.5 }} />
          <ContentMainWrapper>
            <Stack>
              <InfoItemVertical
                title="Delivery Price"
                detail={
                    <Input
                padding="10px"
                family="Assistant"
                width="100%"
                id="deliveryPrice"
                name="deliveryPrice"
                value={deliveryPrice}
                onChange={(e) => setDeliveryPrice(e.target.value)}
                placeholder="ราคาขนส่ง"
                borderless
              />
                }
              />
              <InfoItemVertical
                title="Bank Transfer Detail"
                detail={
                  <TextAreaNotes 
                  placeholder="รายละเอียดการโอน​"   
                  onChange={(e) => setBankTransferDetail(e.target.value)}
                  value={bankTransferDetail}
                  >
                  </TextAreaNotes>
                }
              />
                   <BlueButton onClick={handleUpdateUserResponse} width="100%" margin="40px 0">
            Confirm
          </BlueButton>
            </Stack>
          </ContentMainWrapper>
        </CardWrapper>
      </SectionWrapper>

    </Wrapper>
  );
}
