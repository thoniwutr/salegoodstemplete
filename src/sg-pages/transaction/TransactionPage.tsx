import React from "react";
import styled from "styled-components";
import Text from "../../ui-kit/Text";
import  DatetimeText from "../../ui-kit/DatetimeText";
import { renderGrayText } from "../../ui-kit/Text";
import { Snackbar, Alert, Box } from "@mui/material";
import { collection, deleteDoc, getDocs, query, where, doc, onSnapshot } from "firebase/firestore"; 
import { firestore } from "../../firebase/firebase-config";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import WordingStatus from '../../ui-kit/WordingStatus'

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

const DataGridWrapper = styled.div`
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
        return params.row.transactionDetail.username
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
      field: 'createdDate',
      headerName: 'Created Date',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      renderCell: function renderDateTime(props) {
        return (
          <DatetimeText
            datetime={props.value}
            outputFormat="dd MMM yyyy , HH:mm"
          />
        )
      },
      align: 'center',
      flex: 1,
    },
    {
      field: "commentMsg",
      headerName: "Comment",
      renderCell: renderGrayText,
      valueGetter: function (params) {
        return params.row.transactionDetail.commentMsg
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
        return (
          <WordingStatus
            wording={props.value}
          />
        )
      },
      valueGetter: function (params) {
        return params.row.transactionDetail.wording
      },
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
  ];
}


export default function TransactionPage() {
  const [transactionDisplay, setTransactionDisplay] = React.useState<any[]>([]);

  const [loading, setLoading] = React.useState(true);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [pageSize, setPageSize] = React.useState(30);

  const handleCloseSnackBar = () => {
    setSnackbarVisible(false);
  };


    const fetchTransaction = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Transactions"));
        setTransactionDisplay([]);
        querySnapshot.forEach((doc) => {  
          setTransactionDisplay((transactionDisplay) => [...transactionDisplay, doc.data()]);
        });
      } catch (error: any) {
        setErrorMsg(error.response.data.message);
        setSnackbarVisible(true);
      } finally {
        setLoading(false);
      }
    }


  React.useEffect(() => {
    fetchTransaction();
  }, []);

    return   (
        <Wrapper>
        <TitleWrapper>
          <Text size={1.5} weight={500} family="LexendDeca">
            Transaction
          </Text>
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
            rows={transactionDisplay}
            columns={txnColumn()}
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
      </Wrapper>
    )
}