import React from "react";
import styled from "styled-components/";

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
import LoadingButton from "@mui/lab/LoadingButton";
import Dropdown from "../../ui-kit/Dropdown";
import { BlueButton } from "../../ui-kit/Button";
import { useFormik } from "formik";
import { RemoveScroll } from "react-remove-scroll";
import Swal from "sweetalert2";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import styles from "./UploadImage.module.css";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase-config";
import { addProduct } from "../../firebase/services/auth";


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
  onClose: () => void;
};

export default function AddProductModal(props: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imgURL, setImgURL] = React.useState("http://i.pravatar.cc/500?img=7");

  const handleAddProduct = (value: {
    productId: string;
    productName: string;
    productDetail: string;
    quantity: number;
    wordingOrder: string;
    price: string;
    imgURL: string;
    available: boolean;
  }) => {
    console.log(value);
    addProduct(value)
  };

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
        });
      }
    );
  };

  const { values, setFieldValue, handleSubmit, errors, handleChange } =
    useFormik<ProductPayload>({
      initialValues: {
        productId: "",
        productName: "",
        productDetail: "",
        quantity: 0,
        wordingOrder: "",
        price: "",
        imgURL: "",
        available: false,
      },
      onSubmit: handleAddProduct,
      validateOnBlur: false,
      validateOnChange: false,
    });

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
                error={false}
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
                error={false}
                value={values.productDetail}
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
                error={false}
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
                error={false}
                value={values.price}
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
                error={false}
                value={values.wordingOrder}
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
                onChange={handleChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
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
