import React from 'react'
import styled from "styled-components";
import Text from "../../ui-kit/Text";
import { Snackbar, Alert, Box } from "@mui/material";

import IconButton from '@mui/material/IconButton'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddProductModal from './AddProductModal'

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: white;
  width: 100%;
  height: 100%;
  padding: 0px 50px 50px 0px;
`;

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

    const [loading, setLoading] = React.useState(true)
    const [snackbarVisible, setSnackbarVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')


    const [addProductVisible, setAddProductVisible] = React.useState(false)



  const handleCloseSnackBar = () => {
    setSnackbarVisible(false);
  };



  return (
    <Wrapper>
      <TitleWrapper>
        <Text size="1.5" weight={500} family="LexendDeca">
          Product
        </Text>
        <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation()
              setAddProductVisible(true)
            }}
          >
            <AddCircleIcon style={{ color: '#6c6c6c' }} />
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
            {/* <DataGrid
                autoHeight
                loading={loading}
                rows={payoutTxn}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 25, 50, 100]}
              /> */}
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
      {addProductVisible && (<AddProductModal
            onClose={() => setAddProductVisible(false)}
        ></AddProductModal>
        )}
    </Wrapper>
  );
}
