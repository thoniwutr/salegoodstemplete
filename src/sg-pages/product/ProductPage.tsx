import React from "react";
import styled from "styled-components";
import Text from "../../ui-kit/Text";
import { Snackbar, Alert, Box } from "@mui/material";

import { ProductPayload } from "../product/types";

import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddProductModal from "./AddProductModal";
import { collection, getDocs } from "firebase/firestore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { firestore } from "../../firebase/firebase-config";
import { renderBlackText, renderGrayText } from "../../ui-kit/Text";
import { constants } from "buffer";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0px 50px 50px 0px;
`;


const FullNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoWrapper = styled.div<{ bgImg?: string }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background-color: #d6deff;
  background-image: url(${({ bgImg }) => bgImg});
  background-size: cover;
`


const DataGridWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
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

export default function ProductPage() {
  const [productDisplay, setProductDisplay] = React.useState<any[]>([])

  const [pageSize, setPageSize] = React.useState(30);
  const [loading, setLoading] = React.useState(true);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const [addProductVisible, setAddProductVisible] = React.useState(false);

  function productColumn(): GridColDef[] {
    return [
      {
        field: "productName",
        headerName: "Product Name",
        headerClassName: "super-app-theme--header",
        renderCell: function renderFullName(param) {
          return (
            <FullNameWrapper>
              <LogoWrapper bgImg={param.row.imgURL} />
              <Text
                color="#000"
                size={1}
                weight={600}
                family="Assistant"
                marginLeft={20}
              >
                {param.row.productName}
              </Text>
            </FullNameWrapper>
          )
        },
        flex: 1,
      },
      {
        field: "productDetail",
        headerName: "Product Detail",
        renderCell: renderGrayText,
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "wordingOrder",
        headerName: "Wording Order",
        renderCell: renderGrayText,
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        renderCell: renderGrayText,
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "price",
        headerName: "Price",
        renderCell: renderGrayText,
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "available",
        headerName: "Available",
        renderCell: renderGrayText,
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
    ];
  }

  const handleCloseSnackBar = () => {
    setSnackbarVisible(false);
  };

  const fetchProduct = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "Products"));
      setProductDisplay([])
        querySnapshot.forEach((doc) => {
           setProductDisplay(productDisplay => [...productDisplay ,doc.data()])
        })
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <Text size={1.5} weight={500} family="LexendDeca">
          Product
        </Text>
        <IconButton
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation();
            setAddProductVisible(true);
          }}
        >
          <AddCircleIcon style={{ color: "#6c6c6c" }} />
        </IconButton>
      </TitleWrapper>
      <DataGridWrapper>
        <Box
          sx={{
            "& .super-app-theme--header": {
              backgroundColor: "#ededed",
              color: "#6c6c6c",
              fontSize: "1rem",
            },
          }}
        >
          <DataGrid
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[pageSize, 50, 100]}
            loading={loading}
            rows={productDisplay}
            columns={productColumn()}
            disableSelectionOnClick
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
      {addProductVisible && (
        <AddProductModal
         onSuccess={() => fetchProduct()}
          onClose={() => setAddProductVisible(false)}
        ></AddProductModal>
      )}
    </Wrapper>
  );
}
