import React from "react";
import { authenticatedRestClient } from '../../api/RestClient'
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
import WordingStatus from "../../ui-kit/WordingStatus";
import { BlueButton } from "../../ui-kit/Button";
import Select from "react-select";
import Swal from 'sweetalert2'


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
`

const OptionsWrapper = styled.div`
  padding: 0px 20px;
  width: 500px;
`
const LeadingWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: white;

  &:hover {
    cursor: pointer;
  }
`
const TableWrapper = styled.div`
  gap: 30px;
  display: flex;
`;


const DataGridTransactionWrapper = styled.div`
  width: 70%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
`;

const DataGridProductWrapper = styled.div`
  width: 30%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
`;


function txnColumn(): GridColDef[] {
  return [
    {
      field: "id",
      headerName: "Transaction ID",
      renderCell: renderGrayText,
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "username",
      headerName: "User Name",
      renderCell: renderGrayText,
      valueGetter: function (params) {
        return params.row.transactionDetail.username;
      },
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "productName",
      headerName: "Product Name",
      renderCell: renderGrayText,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: function renderDateTime(props) {
        return (
          <DatetimeText
            datetime={props.value}
            outputFormat="dd MMM yyyy , HH:mm"
          />
        );
      },
      align: "center",
      flex: 1,
    },
    {
      field: "commentMsg",
      headerName: "Comment",
      renderCell: renderGrayText,
      valueGetter: function (params) {
        return params.row.transactionDetail.commentMsg;
      },
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
      width: 80,
    },
    {
      field: "wording",
      headerName: "CF / CC",
      renderCell: function renderDateTime(props) {
        return <WordingStatus wording={props.value} />;
      },
      valueGetter: function (params) {
        return params.row.transactionDetail.wording;
      },
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
  ];
}

function productColumn(): GridColDef[] {
  return [
    {
      field: "productName",
      headerName: "Product Name",
      renderCell: renderGrayText,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "wordingOrder",
      headerName: "wording",
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
      field: "quantity",
      headerName: "Quantity",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: renderGrayText,
      align: "center",
      flex: 1,
    },
  ];
}

export default function TransactionPage() {
  const navigate = useNavigate();
  const [transactionDisplay, setTransactionDisplay] = React.useState<any[]>([]);
  const [productDisplay, setProductDisplay] = React.useState<any[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pageSize, setPageSize] = React.useState(30);
  const [postIdSelected, setPostIdSelected] = React.useState<any>(null);
  const [options, setOptions] = React.useState<any>(null);
  const [isConfirmOrder, setIsConfirmOrder] = React.useState(true);

  const handleCloseSnackBar = () => {
    setSnackbarVisible(false);
  };


  const requestToConfirmOrder = async (postId) => {
    try {
      await authenticatedRestClient.post('/create-order', {
        postId: postId
      })
      navigate("/order");
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      })
    } finally {
        console.log("Finally")
    }
  }



  const handleCreateOrder = () => {
    Swal.fire({
      title: `<span style="color: #F65129;"><i class="fas fa-question-circle"></i></span> <span class="ml-10">Are you sure?</span>`,
      text: `You will Create Order by these transactions`,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: 'Create Order',
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
         console.log(postIdSelected.value)
         requestToConfirmOrder(postIdSelected.value)
      }
  })
  }

   
  const fetchTransactionRealtime = async (postId) => {  
    const q = query(collection(firestore, "Transactions"),where("transactionDetail.postId", "==", postId));
    onSnapshot(q, (querySnapshot) => {
      const txnList = querySnapshot.docs.map((doc) => doc.data());
      setTransactionDisplay(txnList)
      setIsConfirmOrder(txnList[0].txnStatus !== "completed")
    })
  }


  const fetchProduct = async () => {  
    const q = query(collection(firestore, "Products"), where("available", "==", "available"));
    onSnapshot(q, (querySnapshot) => {
      const productList = querySnapshot.docs.map((doc) => doc.data());
      setProductDisplay(productList)
    })
  }
  

  const fetchTransaction = async () => {

    try {
      const querySnapshot = await getDocs(
        collection(firestore, "Transactions")
      );

      setTransactionDisplay([]);
      const txnList = querySnapshot.docs.map((doc) => doc.data());
      const postIdList: any[] = [];

      txnList.forEach((data) => {
        postIdList.push(data.transactionDetail.postId);
      });

      console.log(txnList);
      const postIdNotDuplicated = postIdList.reduce(
        (x, y) => (x.includes(y) ? x : [...x, y]),
        []
      );
      console.log(postIdNotDuplicated);

      const optionsList: any[] = [];

      postIdNotDuplicated.forEach( postId => {
        const temp =  txnList.filter( x => 
          x.transactionDetail.postId === postId
        )
        optionsList.push({value:postId,label:temp[0].createdDate})
        console.log(temp)
        console.log("============")
      })
     
      console.log(optionsList)
      const sortedOptions = optionsList.sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime())
      setOptions(sortedOptions)
      setPostIdSelected(sortedOptions[0])
      //Set First List
      const firstTxn =  txnList.filter( x => 
        x.transactionDetail.postId === sortedOptions[0].value
      )
      setTransactionDisplay(firstTxn);

    } catch (error: any) {
      setErrorMsg(error.response.data.message);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };


  React.useEffect(() => {
   if(postIdSelected !== null){
    fetchTransactionRealtime(postIdSelected.value)
   }
    console.log(postIdSelected)
  }, [postIdSelected]);

  React.useEffect(() => {
    fetchProduct()
    fetchTransaction();
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <TailingWrapper>
        <Text size={1.5} weight={500} family="LexendDeca">
          Transaction
        </Text>
        <OptionsWrapper>
        <Select
        placeholder = "Select Live....."
          value={postIdSelected}
          onChange={setPostIdSelected}
          options={options}
        />
        </OptionsWrapper>
    
        </TailingWrapper>
      
        <LeadingWrapper>
      <BlueButton onClick={handleCreateOrder} width="200" margin="0">
          Confirm Order
        </BlueButton>
        </LeadingWrapper>
      </TitleWrapper>
      <TableWrapper>
      <DataGridTransactionWrapper>
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
            rows={transactionDisplay}
            columns={txnColumn()}
            disableSelectionOnClick
          />
        </Box>
      </DataGridTransactionWrapper>
      <DataGridProductWrapper>
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
            rows={productDisplay}
            columns={productColumn()}
            disableSelectionOnClick
          />
        </Box>
      </DataGridProductWrapper>
      </TableWrapper>
  
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
    </Wrapper>
  );
}
