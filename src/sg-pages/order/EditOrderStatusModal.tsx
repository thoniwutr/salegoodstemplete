import React from "react";
import styled from "styled-components/";
import styles from "./UploadImage.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'

import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCloseButton,
} from "../../ui-kit/Modal";
import Text from "../../ui-kit/Text";
import InfoItem from "../../ui-kit/InfoItem";
import Input from "../../ui-kit/Input";
import { BlueButton } from "../../ui-kit/Button";

import LoadingButton from "@mui/lab/LoadingButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dropdown from "../../ui-kit/Dropdown";

import { RemoveScroll } from "react-remove-scroll";

import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, firestore } from "../../firebase/firebase-config";
import { useAuth } from '../../sg-context/AuthContext'
import { collection, addDoc, getDocs, updateDoc, query, where, doc } from "firebase/firestore"; 

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 10px;
`

const ProfilePicImage = styled.div<{ imgURL?: string }>`
  background-image: url(${(props) => props.imgURL});
`;

const MappingWrapper = styled.div`
  gap: 10px;
  display: flex;
`;
type Props = {
  orderId : string
  orderStatusParam: string
  onSuccess: () => Promise<void>
  onClose: () => void;
};

export default function EditOrderStatusModal(props: Props) {
  const [orderStatus, setNewStatus] = React.useState<string>(props.orderStatusParam);

  console.log(props.orderId)
  
  console.log(props.orderStatusParam)
  
const handleUpdateStatus= async () => {
  try {
    console.log(props.orderId)
      const userRef = query(collection(firestore, "Order"), where("id", "==", props.orderId));
      const findUsers = await getDocs(userRef);
      findUsers.forEach( async (user) => {
        console.log(user.data())
        const getUser = doc(firestore, "Order", user.id);
        await updateDoc(getUser, {"orderData.orderStatus": orderStatus});
        props.onSuccess()
       });
  } catch (e) {
    console.error("Error adding document: ", e);
  } finally {
    props.onClose()
  }

}


  return (
    <RemoveScroll >
  <Wrapper>
      <Modal>
        <ModalBackground />
        <ModalCard
          height="auto"
          style={{
            position: "relative",
            padding: "0 36px 26px 36px",
            width: "450px",
            overflow: "auto",
          }}
        >
          <Text
            size={1.25}
            family="LexendDeca"
            align="center"
            color="#363636"
            style={{
              marginTop: "26px",
              marginBottom: "10px",
            }}
          >
            Edit Order Status
          </Text>


          <InfoItem
            title="Price"
            marginTop={200}
            detail={
                <Dropdown
                id="eventSource"
                name="eventSource"
                style={{ width: '100%', height: '40px', border: '1px solid #b5b5b5', borderRadius: '5px', padding: '10px' }}
                value={orderStatus}
                onChange={(e) => setNewStatus(e.target.value)}
            >
                <Dropdown.Item value="waiting for payment" displayName="waiting for payment" />
                <Dropdown.Item value="success" displayName="success" />
            </Dropdown>
            }
          />
         
          <BlueButton onClick={(e) => handleUpdateStatus()} width="100%" margin="20px 0">
            Confirm
          </BlueButton>
          <ModalCloseButton onClick={props.onClose} />
        </ModalCard>
      </Modal>
      </Wrapper>
    </RemoveScroll>
  );
}
