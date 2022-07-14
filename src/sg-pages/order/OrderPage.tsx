import React from "react";
import { authenticatedRestClient } from "../../api/RestClient";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Text from "../../ui-kit/Text";
import DatetimeText from "../../ui-kit/DatetimeText";
import { renderGrayText } from "../../ui-kit/Text";
import { Snackbar, Alert, Box } from "@mui/material";
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
import { firestore } from "../../firebase/firebase-config";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditOrderStatusModal from "./EditOrderStatusModal";
import { OrderStatusButton } from "../../ui-kit/Button";
import { useAuth } from '../../sg-context/AuthContext'

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0px 50px 50px 0px;
`;

const TitleWrapper = styled.div`
  padding: 20px 0;
  background-color: white;
  width: 100%;
  align-items: center;
  vertical-align: middle;
  justify-content: space-between;
  text-align: center;
  display: flex;
`;

const TailingWrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: white;

  &:hover {
    cursor: pointer;
  }
`;

const DataGridWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
`;

export default function OrderPage() {
  const navigate = useNavigate();
  const { currentUser} = useAuth()
  const [orderDisplay, setOrderDisplay] = React.useState<any[]>([]);
  const [deliveryPrice, setDeliveryPrice] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pageSize, setPageSize] = React.useState(30);
  const [orderStatusVisible, setOrderStatusVisible] = React.useState(false);

  const [orderId, setOrderId] = React.useState("");
  const [currentOrderStatus, setCurrentOrderStatus] = React.useState("");


  const fetchTransactionByPostId = async () => {
    try {
      const q = query(collection(firestore, "Order"));
      const querySnapshot = await getDocs(q);
      const orderList = querySnapshot.docs.map((doc) => doc.data());
      setOrderDisplay(orderList);
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
currentUser?.uid
  React.useEffect(() => {
    fetchUserManagement()
    fetchTransactionByPostId();
  }, []);

  React.useEffect(() => {
    console.log(orderDisplay)
  }, [orderDisplay]);

  const handleCloseSnackBar = () => {
    setSnackbarVisible(false);
  };

  function txnColumn(): GridColDef[] {
    return [
      {
        field: "id",
        headerName: "Order ID",
        renderCell: renderGrayText,
        headerClassName: "super-app-theme--header",
        width: 200,
      },
      {
        field: "customerName",
        headerName: "Customer Name",
        renderCell: renderGrayText,
        valueGetter: function (params) {
          return params.row.orderData.customerName;
        },
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "createdDate",
        headerName: "Created Date",
        headerClassName: "super-app-theme--header",
        valueGetter: function (params) {
          return params.row.orderData.createdDate;
        },
        headerAlign: "center",
        renderCell: renderGrayText,
        align: "center",
        width: 200,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        headerClassName: "super-app-theme--header",
        valueGetter: function (params) {
          let amount = 0
          params.row.productDetail.forEach((data) => {
            amount += data.totalQuantity;
          })

          return amount;
        },
        headerAlign: "center",
        renderCell: renderGrayText,
        align: "center",
        width: 100,
      },
      {
        field: "amount",
        headerName: "Order Amount",
        headerClassName: "super-app-theme--header",
        valueGetter: function (params) {
          let amount = 0
          params.row.productDetail.forEach((data) => {
            amount += data.price
          })
          return amount + Number(deliveryPrice);
        },
        headerAlign: "center",
        renderCell: renderGrayText,
        align: "center",
        flex: 1,
      },
      {
        field: "orderStatus",
        headerName: "Order Status",
        headerClassName: "super-app-theme--header",
        renderCell: (data) => {
          return <OrderStatusButton type="submit" width="100%" margin="10" onClick={(e)=> {
            e.stopPropagation()
            setCurrentOrderStatus(data.row.orderData.orderStatus)
            setOrderId(data.row.id)
            setOrderStatusVisible(true)
          }}>{data.row.orderData.orderStatus}</OrderStatusButton>
      },
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
    ];
  }


  const handleCellClick = (e: any) => {
    navigate(`/order/${e.id}`)
  }

  return (
    <Wrapper>
      <TitleWrapper>
        <TailingWrapper>
          <Text size={1.5} weight={500} family="LexendDeca">
            Orders
          </Text>
        </TailingWrapper>
      </TitleWrapper>
      <DataGridWrapper>
        <Box
          sx={{
            "& .super-app-theme--header": {
              backgroundColor: "#ededed",
              color: "#6c6c6c",
              fontSize: "0.8rem",
            },
          }}
        >
          <DataGrid
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[pageSize, 50, 100]}
            loading={loading}
            rows={orderDisplay}
            columns={txnColumn()}
            onCellClick={handleCellClick}
          />
        </Box>
      </DataGridWrapper>
      <Snackbar
        open={snackbarVisible}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      {orderStatusVisible && (
        <EditOrderStatusModal
          orderId={orderId}
          orderStatusParam={currentOrderStatus}
          onSuccess={() => fetchTransactionByPostId()}
          onClose={() => setOrderStatusVisible(false)}
        ></EditOrderStatusModal>
      )}
    </Wrapper>
  );
}
