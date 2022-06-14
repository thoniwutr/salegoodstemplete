import React from "react";
import styled from "styled-components";
import Text from "../../ui-kit/Text";
import AddProductModal from "./AddProductModal";
import { firestore } from "../../firebase/firebase-config";
import { renderGrayText } from "../../ui-kit/Text";
import { Dot } from "../../ui-kit/Dot";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Snackbar, Alert, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Swal from 'sweetalert2'
import { collection, deleteDoc, getDocs, query, where, doc } from "firebase/firestore"; 


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


const FullNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div<{ bgImg?: string }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background-color: #d6deff;
  background-image: url(${({ bgImg }) => bgImg});
  background-size: cover;
`;

const DataGridWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
`;

export default function ProductPage() {
  const [productDisplay, setProductDisplay] = React.useState<any[]>([]);
  const [product, setProduct] = React.useState<any>(undefined);
  const [action, setAction] = React.useState("add");
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
          );
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
        field: "createdDate",
        headerName: "Created Date",
        renderCell: renderGrayText,
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "edit",
        headerName: "Edit",
        renderCell: (param) => {
          return (
            <IconButton
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                setAction("edit")
                setProduct({
                  id: param.row.id,
                  productName: param.row.productName,
                  productDetail: param.row.productDetail,
                  quantity: param.row.quantity,
                  wordingOrder: param.row.wordingOrder,
                  price: param.row.price,
                  imgURL : param.row.imgURL,
                  available: param.row.available,
                  facebookId: param.row.facebookId,
                  createdDate : param.row.createdDate,
                })
                setAddProductVisible(true);
              }}
            >
              <EditIcon style={{ color: "#6c6c6c" }} />
            </IconButton>
          );
        },
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        width: 80,
      },
      {
        field: "delete",
        headerName: "Delete",
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        width: 80,
        renderCell: function renderDelete(param) {
          return (
            <>
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(param.row.id)
                }}
              >
                <DeleteIcon style={{ color: "#6c6c6c" }} />
              </IconButton>
            </>
          );
        },
      },
      {
        field: "available",
        headerName: "Available",
        renderCell: function renderStatus(param) {
          return <Dot available={param.row.available} />;
        },
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


  const handleDelete = (productId) => {
    Swal.fire({
      title: `<span style="color: #F65129;"><i class="fas fa-question-circle"></i></span> <span class="ml-10">Are you sure?</span>`,
      text: `You will delete product`,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      allowEscapeKey: false,
      allowEnterKey: false,
      reverseButtons: true,
      customClass: {
          confirmButton: 'popup-confirm-green-button',
          cancelButton: 'popup-cancel-button',
      },
  }).then(async (result) => {
      if (result.isConfirmed) {
          try {
            const userRef = query(collection(firestore, "Products"), where("id", "==",productId));
            const findUsers = await getDocs(userRef);
            findUsers.forEach( async (user) => {
              const getUser = doc(firestore, "Products", user.id);
              await deleteDoc(getUser);
              Swal.fire({
                allowOutsideClick: false,
                icon: 'success',
                title: 'Success',
                text: `Product has been deleted`,
                customClass: {
                    confirmButton: 'popup-confirm-button',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    fetchProduct( )
                }
            })
             });
          } catch (error: any) {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.message,
              })
          }
      }
  })
  }

  const fetchProduct = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "Products"));
      setProductDisplay([]);
      querySnapshot.forEach((doc) => {  
        setProductDisplay((productDisplay) => [...productDisplay, doc.data()]);
      });
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
            setAction("add")
            setProduct(undefined);
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
          productPayload={product}
          action={action}
          onSuccess={() => fetchProduct()}
          onClose={() => setAddProductVisible(false)}
        ></AddProductModal>
      )}
    </Wrapper>
  );
}
