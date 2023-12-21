import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


export default function Result() {
  const [tenderId, setTenderId] = useState(0);
  const [tokenId, setTokenId] = useState(0);
  const [name, setName] = useState(" [Getting Data.....] ");
  const [visible, setVisible] = useState("none");
  // const [, set] = useState("...");
  // const [, set] = useState("...");
  // const [, set] = useState("...");
  // const [, set] = useState("...");

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Field',
      headerName: 'Field',
      width: 150,
    },
    {
      field: 'Value',
      headerName: 'Value',
      width: 700,
    }
  ];

  const  [rows,setRows] = useState([]);

  useEffect(() => {
    async function chk2(){
    await axios.get("http://localhost:8282/getWinner").then((response) => {
      if (response.data === "Error") {
        alert(response.data);
      } else {
        console.log(response.data);
      }
    });
  }

  chk2();
  }, []);

  console.log(rows);
  return(
    <div>
      <div className="containers mx-auto text-5xl font-semibold  my-20 text-center">the final answer for the question is : {tenderId} </div>
      <LinearProgress className="mx-60 my-20" style={{ display: visible}} color="success"  />
    <Box className="px-10" sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
    </div>
  )
}
