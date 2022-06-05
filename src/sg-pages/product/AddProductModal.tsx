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
import Input from '../../ui-kit/Input'
import LoadingButton from "@mui/lab/LoadingButton";
import Dropdown from "../../ui-kit/Dropdown";
import { BlueButton } from "../../ui-kit/Button";
import { useFormik } from "formik";
import { RemoveScroll } from "react-remove-scroll";
import Swal from "sweetalert2";

const MappingWrapper = styled.div`
  gap: 10px;
  display: flex;
`;
type Props = {
  onClose: () => void;
};

export default function AddProductModal(props: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleAddProduct = () => {
    console.log("add");
  };

  const { values, setFieldValue, handleSubmit,errors, handleChange } =
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
    <RemoveScroll>
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
          <InfoItem
                    title="Product Name"
                    marginTop={20}
                    detail={
                        <Input
                            padding="10px"
                            family="Assistant"
                            width="100%"
                            id="role"
                            name="role"
                            error={false}
                            value={values.productName}
                            onChange={handleChange}
                            borderless
                        />
                    }
                />

<InfoItem
                    title="Product Description"
                    marginTop={200}
                    detail={
                        <Input
                            padding="10px"
                            family="Assistant"
                            width="100%"
                            id="role"
                            name="role"
                            error={false}
                            value={values.productName}
                            onChange={handleChange}
                            borderless
                        />
                    }
                />

          <InfoItem
            title="Avaliable"
            marginTop={20}
            detail={
              <Dropdown
                id="eventSource"
                name="eventSource"
                style={{
                  width: "100%",
                  height: "40px",
                  border: "1px solid #b5b5b5",
                  borderRadius: "5px",
                  padding: "10px",
                }}
                value={values.productId}
                onChange={handleChange}
              >
                
                <Dropdown.Item value="PAYOUT_PAID" displayName="true" />
                <Dropdown.Item
                  value="PAYMENT_RESULT"
                  displayName="false"
                />
              </Dropdown>
            }
          />
            <BlueButton type="submit" width="180" margin="10">
          Confirm
        </BlueButton>
          <ModalCloseButton onClick={props.onClose} />
        </ModalCard>
      </Modal>
    </RemoveScroll>
  );
}
