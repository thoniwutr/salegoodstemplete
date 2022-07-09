import React from "react";
import styled from "styled-components/";
import styles from "./UploadImage.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'

import { ProductPayload } from "./types";
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


import { RemoveScroll } from "react-remove-scroll";

import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, firestore } from "../../firebase/firebase-config";
import { useAuth } from '../../sg-context/AuthContext'
import { collection, addDoc, getDocs, updateDoc, query, where, doc } from "firebase/firestore"; 

const Wrapper = styled.form`
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
  productPayload? : ProductPayload
  action : string
  onSuccess: () => Promise<void>
  onClose: () => void;
};

export default function AddProductModal(props: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imgURL, setImgURL] = React.useState(props.productPayload ? props.productPayload.imgURL : "https://www.kindpng.com/picc/m/285-2855863_a-festival-celebrating-tractors-round-profile-picture-placeholder.png");
  const { currentUser, logout} = useAuth()
  

  const validationSchema = Yup.object().shape({
    id: Yup.string().required(),
    productName: Yup.string().required(),
    productDetail: Yup.string().required(),
    quantity: Yup.number().required(),
    wordingOrder: Yup.string().required(),
    price: Yup.number().required(),
    imgURL: Yup.string(),
    available: Yup.string().required(),
    facebookId: Yup.string().required(),
    createdDate: Yup.string().required(),
})

const handleAddProduct = async (value: {
  id: string;
  productName: string;
  productDetail: string;
  quantity: number;
  wordingOrder: string;
  price: number;
  imgURL: string;
  available: 'available' | 'unavailable';
  facebookId: string;
  createdDate: string;
}) => {

  try {
    if(props.action === 'add'){
      const docRef = await addDoc(collection(firestore, "Products"), value);
      props.onSuccess()
    }else if(props.action === 'edit'){
      const userRef = query(collection(firestore, "Products"), where("id", "==", props?.productPayload?.id!!));
      const findUsers = await getDocs(userRef);
      findUsers.forEach( async (user) => {
        const getUser = doc(firestore, "Products", user.id);
        await updateDoc(getUser, value);
        props.onSuccess()
       });

    }
  } catch (e) {
    console.error("Error adding document: ", e);
  } finally {
    props.onClose()
  }

};


  const { values, setFieldValue, handleSubmit, errors, handleChange } =
    useFormik<ProductPayload>({
      initialValues: {
        id: props.productPayload ? props.productPayload.id : uuidv4(),
        productName: props.productPayload ? props.productPayload.productName : '',
        productDetail: props.productPayload ? props.productPayload.productDetail : '',
        quantity: props.productPayload ? props.productPayload.quantity : 0,
        wordingOrder: props.productPayload ? props.productPayload.wordingOrder : '',
        price: props.productPayload ? props.productPayload.price : 0,
        imgURL: props.productPayload ? props.productPayload.imgURL : '',
        available: props.productPayload ? props.productPayload.available : 'unavailable',
        facebookId: props.productPayload ? props.productPayload.facebookId : currentUser?.providerData[0].uid!!,
        createdDate: props.productPayload ? props.productPayload.createdDate :  new Date().toLocaleString(),
      },
      validationSchema: validationSchema,
      onSubmit: handleAddProduct,
      validateOnBlur: false,
      validateOnChange: false,
    });

    const setFieldValueTypeSafe = React.useCallback(
      (fieldName: keyof ProductPayload, value: any) => {
          setFieldValue(fieldName, value)
      },
      [setFieldValue]
  )


  const handleUploadImage = (e) => {
    console.log(e.target.file);
    const file = e.target.files[0];

    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/product_image/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImgURL(url);
          setFieldValueTypeSafe('imgURL',url)
        });
      }
    );
  };


  return (
    <RemoveScroll >
  <Wrapper onSubmit={handleSubmit} noValidate>
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
            Add Product
          </Text>

          <div className={styles.avatarUpload}>
            <div className={styles.avatarEdit}>
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => handleUploadImage(e)}
              />
              <label htmlFor="imageUpload"></label>
            </div>
            <div className={styles.avatarPreview}>
              <ProfilePicImage
                id="imagePreview"
                imgURL={imgURL}
              ></ProfilePicImage>
            </div>
          </div>

          <InfoItem
            title="Product Name"
            marginTop={20}
            detail={
              <Input
                padding="10px"
                family="Assistant"
                width="100%"
                id="productName"
                name="productName"
                error={errors.productName}
                value={values.productName}
                onChange={handleChange}
                borderless
              />
            }
          />

          <InfoItem
            title="Product Detail"
            marginTop={200}
            detail={
              <Input
                padding="10px"
                family="Assistant"
                width="100%"
                id="productDetail"
                name="productDetail"
                error={errors.productDetail}
                value={values.productDetail}
                onChange={handleChange}
                borderless
              />
            }
          />
           <InfoItem
            title="Wording Order"
            marginTop={200}
            detail={
              <Input
                padding="10px"
                family="Assistant"
                width="100%"
                id="wordingOrder"
                name="wordingOrder"
                error={errors.wordingOrder}
                value={values.wordingOrder}
                onChange={handleChange}
                borderless
              />
            }
          />
          <InfoItem
            title="Quantity"
            marginTop={200}
            detail={
              <Input
                padding="10px"
                family="Assistant"
                width="100%"
                id="quantity"
                name="quantity"
                type="number"
                error={errors.quantity}
                value={values.quantity}
                onChange={handleChange}
                borderless
              />
            }
          />
          <InfoItem
            title="Price"
            marginTop={200}
            detail={
              <Input
                padding="10px"
                family="Assistant"
                width="100%"
                id="price"
                name="price"
                type="number"
                error={errors.price}
                value={values.price}
                onChange={handleChange}
                borderless
              />
            }
          />
          <InfoItem
            title="Available"
            marginTop={15}
            detail={
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                id="available"
                value={values.available}
                onChange={ (e) => setFieldValueTypeSafe('available', e.target.value)}
              >
                <FormControlLabel
                  value='available'
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value='unavailable'
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            }
          />
          <BlueButton type="submit" width="100%" margin="10">
            Confirm
          </BlueButton>
          <ModalCloseButton onClick={props.onClose} />
        </ModalCard>
      </Modal>
      </Wrapper>
    </RemoveScroll>
  );
}
