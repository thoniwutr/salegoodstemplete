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
  onSnapshot,
  documentId,
} from "firebase/firestore";
import InfoItemVertical from "../../ui-kit/InfoItemVertical";

import { Snackbar, Alert, Stack, Divider, Box } from "@mui/material";
import { useAuth } from '../../sg-context/AuthContext'

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

const FullNameWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoMainWrapper = styled.div`
  width: 80px;
`


const LogoWrapper = styled.div<{ bgImg?: string }>`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: #d6deff;
  background-image: url(${({ bgImg }) => bgImg});
  background-size: cover;
`

const TextWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const TextDetailWrapper = styled.div`
  width: 150px;
`
export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetailDisplay, setOrderDetailDisplay] =
    React.useState<any>(undefined);
    const [productDetailDisplay, setProductDetailDisplay] =
    React.useState<any[]>([]);
    const [amountPrice, setAmountPrice] =
    React.useState(0);
    const [deliveryPrice, setDeliveryPrice] = React.useState(0);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const { currentUser} = useAuth()

  const fetchProductDetail = async (listOfId,productDetail) => {
    try {
        console.log(listOfId)
      const q = query(
        collection(firestore, "Products"),
        where("id", "in", listOfId)
      );
      const querySnapshot = await getDocs(q);
      const product = querySnapshot.docs.map((doc) => doc.data());

      const productDisplayF = product.map((data) => {
        const p = productDetail.find((p) => p.productId === data.id)
        console.log(data)
        return ({pDetail : p, pData : data})
      })
      setProductDetailDisplay(productDisplayF)
    } catch (error: any) {
      return null;
      setErrorMsg(error.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetail = async () => {
    try {
      const q = query(
        collection(firestore, "Order"),
        where("id", "==", orderId)
      );
      const querySnapshot = await getDocs(q);
      const order = querySnapshot.docs.map((doc) => doc.data());
      setOrderDetailDisplay(order[0]);

      let productId : any = []
      let sumAmount = 0
      order[0].productDetail.map((product) => {
        sumAmount += product.price
        productId = ([...productId, product.productId])
      })
      setAmountPrice(sumAmount)

      fetchProductDetail(productId,order[0].productDetail)

    } catch (error: any) {
      setErrorMsg(error.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserManagement = async () => {
    try {
      const q = query(collection(firestore, "UserManagement"),where("id", "==", currentUser?.uid));
      const querySnapshot = await getDocs(q);
      const orderList = querySnapshot.docs.map((doc) => doc.data());
      setDeliveryPrice(orderList[0].deliveryPrice);
    } catch (error: any) {
      setErrorMsg(error.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };


  React.useEffect(() => {
    fetchOrderDetail();
    fetchUserManagement();
  }, []);



  return (
    <Wrapper>
      <TopWrapper>
        <TitleWrapper>
          <Text size={1.5} weight={500} family="LexendDeca">
            {orderId}
          </Text>
        </TitleWrapper>
      </TopWrapper>

      <SectionWrapper>
        <CardWrapper>
          <HeaderWrapper>
            <TitleWrapper>
              <Text size={1.4} weight={500} family="LexendDeca">
                Order Detail
              </Text>
            </TitleWrapper>
          </HeaderWrapper>
          <Divider sx={{ mt: 1.5, mb: 1.5 }} />
          <ContentMainWrapper>
            <Stack>
              <InfoItemVertical
                title="Customer Name"
                detail={
                  <Text family="Assistant" size={1.1} color="#000">
                    {orderDetailDisplay
                      ? orderDetailDisplay.orderData.customerName
                      : "-"}
                  </Text>
                }
              />
              <InfoItemVertical
                title="Facebook ID"
                detail={
                  <Text family="Assistant" size={1.1} color="#000">
                    {orderDetailDisplay
                      ? orderDetailDisplay.orderData.customerfacebookId
                      : "-"}
                  </Text>
                }
              />
              <InfoItemVertical
                title="Live ID"
                detail={
                  <Text family="Assistant" size={1.1} color="#000">
                    {orderDetailDisplay
                      ? orderDetailDisplay.orderData.postId
                      : "-"}
                  </Text>
                }
              />
              <InfoItemVertical
                title="Created Date"
                detail={
                  <Text family="Assistant" size={1.1} color="#000">
                    {orderDetailDisplay
                      ? orderDetailDisplay.orderData.createdDate
                      : "-"}
                  </Text>
                }
              />
              <InfoItemVertical
                title="Order Status"
                detail={
                  <Text family="Assistant" size={1.1} color="#000">
                    {orderDetailDisplay
                      ? orderDetailDisplay.orderData.orderStatus
                      : "-"}
                  </Text>
                }
              />
            </Stack>
          </ContentMainWrapper>
        </CardWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <CardWrapper>
          <HeaderWrapper>
            <TitleWrapper>
              <Text size={1.4} weight={500} family="LexendDeca">
                Product Detail
              </Text>
            </TitleWrapper>
          </HeaderWrapper>
          <Divider sx={{ mt: 1.5, mb: 1.5 }} />
          <ContentMainWrapper>
            <Stack>
            {productDetailDisplay && productDetailDisplay.map((data, idx) => (
                    <FullNameWrapper key={idx}>
                    <LogoMainWrapper>
                    <LogoWrapper bgImg={data.pDetail.price} />
                    </LogoMainWrapper>
                    <TextWrapper>
                        <TextDetailWrapper>
                        <Text
                      color="#000"
                      size={0.8}
                      weight={600}
                      family="Assistant"
                    >
                       {data.pData.productName}  
                       </Text>
                      </TextDetailWrapper>

                      <TextDetailWrapper>
                        <Text
                      color="#000"
                      size={0.8}
                      weight={600}
                      family="Assistant"
                    >
                       {data.pData.productDetail}  
                       </Text>
                      </TextDetailWrapper>
                        
  
  
                      <TextDetailWrapper>
                        <Text
                      color="#000"
                      size={0.8}
                      weight={600}
                      family="Assistant"
                    >
                       {data.pDetail.totalQuantity} Unit
                       </Text>
                      </TextDetailWrapper>
                        
                      <TextDetailWrapper>
                        <Text
                      color="#000"
                      size={0.8}
                      weight={600}
                      family="Assistant"
                    >
                       {data.pDetail.price} THB
                       </Text>
                      </TextDetailWrapper>
                        

                    </TextWrapper>
                  </FullNameWrapper>
                  ))}
            </Stack>
          </ContentMainWrapper>
        </CardWrapper>
      </SectionWrapper>

      <SectionWrapper>
        <CardWrapper>
          <HeaderWrapper>
            <TitleWrapper>
              <Text size={1.4} weight={500} family="LexendDeca">
                Order Summary
              </Text>
            </TitleWrapper>
          </HeaderWrapper>
          <Divider sx={{ mt: 1.5, mb: 1.5 }} />
          <ContentMainWrapper>
            <Stack>
              <InfoItemVertical
                title="Amount"
                detail={
                  <Text family="Assistant" size={1.1} color="#000">
                    {amountPrice}(Product Amount) + {deliveryPrice}(Delivery Price)  = {amountPrice+Number(deliveryPrice)} THB
                  </Text>
                }
              />
            </Stack>
          </ContentMainWrapper>
        </CardWrapper>
      </SectionWrapper>
    </Wrapper>
  );
}
