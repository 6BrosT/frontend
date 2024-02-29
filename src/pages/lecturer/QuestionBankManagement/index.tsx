import {
  Box,
  Stack,
  Grid,
  Container,
  DialogContent,
  DialogActions,
  IconButton,
  DialogTitle,
  Dialog
} from "@mui/material";

import Typography from "@mui/joy/Typography";
import Textarea from "@mui/joy/Textarea";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridColDef,
  GridRowModesModel,
  GridActionsCellItem,
  GridEventListener
} from "@mui/x-data-grid";
import SearchBar from "components/common/search/SearchBar";
import InputTextField from "components/common/inputs/InputTextField";
import { red, grey, blue } from "@mui/material/colors";
import { useNavigate, useOutletContext } from "react-router-dom";
import { routes } from "routes/routes";
import Button, { BtnType } from "components/common/buttons/Button";
import Heading1 from "components/text/Heading1";
import ParagraphBody from "components/text/ParagraphBody";
import classes from "./styles.module.scss";

const rows = [
  {
    id: "abc",
    category: "Học thuật toán",
    createdAtBy: { name: "Nguyễn Quốc Tuấn", time: "02/12/2023 10:30AM" },
    updatedAtBy: { name: "Dương Chí Thông", time: "05/12/2023 10:30PM" }
  },
  {
    id: "abc2",
    category: "Java",
    createdAtBy: { name: "Nguyễn Quốc Tuấn", time: "02/12/2023 10:30AM" },
    updatedAtBy: { name: "Dương Chí Thông", time: "05/12/2023 10:30PM" }
  },
  {
    id: "abc3",
    category: "Mảng 1 chiều",
    createdAtBy: { name: "Nguyễn Quốc Tuấn", time: "02/12/2023 10:30AM" },
    updatedAtBy: { name: "Dương Chí Thông", time: "05/12/2023 10:30PM" }
  },
  {
    id: "abc4",
    category: "Mảng 2 chiều",
    createdAtBy: { name: "Nguyễn Quốc Tuấn", time: "02/12/2023 10:30AM" },
    updatedAtBy: { name: "Dương Chí Thông", time: "05/12/2023 10:30PM" }
  },
  {
    id: "abc5",
    category: "Con trỏ",
    createdAtBy: { name: "Nguyễn Quốc Tuấn", time: "02/12/2023 10:30AM" },
    updatedAtBy: { name: "Dương Chí Thông", time: "05/12/2023 10:30PM" }
  }
];
// function EditToolbar() {
//   return (
//     <GridToolbarContainer>
//       <Box>
//         <MButton color='primary' startIcon={<AddIcon />}>
//           Thêm mới
//         </MButton>
//         <Divider />
//       </Box>
//     </GridToolbarContainer>
//   );
// }

const QuestionBankManagement = () => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: rows,
    total: 0,
    page: 1,
    pageSize: 5
  });
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const columns: GridColDef[] = [
    {
      field: "stt",
      sortable: false,
      width: 20,
      align: "center",
      headerClassName: classes["table-head"],
      renderCell: (params) => {
        return <ParagraphBody>{params.row.stt}</ParagraphBody>;
      },
      renderHeader: (params) => {
        return <ParagraphBody fontWeight={700}>STT</ParagraphBody>;
      }
    },
    {
      field: "category",
      sortable: false,
      flex: 3,
      headerClassName: classes["table-head"],
      renderCell: (params) => {
        return <ParagraphBody>{params.row.category}</ParagraphBody>;
      },
      renderHeader: (params) => {
        return <ParagraphBody fontWeight={700}>Tên danh mục</ParagraphBody>;
      }
    },
    {
      field: "created",
      renderHeader: (params) => {
        return <ParagraphBody fontWeight={700}>Ngày tạo bởi</ParagraphBody>;
      },
      sortable: false,
      flex: 3,
      renderCell: (params) => (
        <div>
          <ParagraphBody>{params.row.createdAtBy.name}</ParagraphBody>
          <div>{params.row.createdAtBy.time}</div>
        </div>
      ),
      headerClassName: classes["table-head"]
    },
    {
      field: "updated",
      renderHeader: (params) => {
        return <ParagraphBody fontWeight={700}>Lần chỉnh sửa cuối bởi</ParagraphBody>;
      },
      sortable: false,
      flex: 3,
      renderCell: (params) => (
        <div>
          <ParagraphBody>{params.row.updatedAtBy.name}</ParagraphBody>
          <div>{params.row.updatedAtBy.time}</div>
        </div>
      ),
      headerClassName: classes["table-head"]
    },
    {
      field: "operation",
      renderHeader: (params) => {
        return <ParagraphBody fontWeight={700}>Tác vụ</ParagraphBody>;
      },
      sortable: false,
      flex: 1,
      type: "actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Save'
            sx={{
              color: "primary.main"
            }}
            onClick={() => {
              //set the edit value
              setOpenCreateDialog(true);
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Cancel'
            className='textPrimary'
            onClick={() => null}
            sx={{
              color: red[500]
            }}
          />
        ];
      },
      headerClassName: classes["table-head"]
    }
  ];
  useEffect(() => {
    //fetch data
  }, [pageState.page, pageState.pageSize]);
  const navigate = useNavigate();

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`${params.row.id}`);
  };

  return (
    <div>
      <TabPanel value='1' sx={{ padding: 0 }}>
        <Container>
          <Stack spacing={2} marginBottom={3}>
            <Heading1 fontWeight={"500"}>Ngân hàng câu hỏi chung</Heading1>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
              <Button btnType={BtnType.Primary} onClick={() => setOpenCreateDialog(true)}>
                <ParagraphBody> Thêm mới</ParagraphBody>
              </Button>
            </Stack>

            <SearchBar onSearchClick={() => null} placeHolder='Tìm kiếm theo danh mục ...' />
            <DataGrid
              sx={{
                "& .MuiDataGrid-cell": { padding: "16px" }
              }}
              autoHeight
              disableColumnMenu
              getRowHeight={() => "auto"}
              rows={pageState.data.map((item, index) => ({ stt: index + 1, ...item }))}
              rowCount={pageState.total}
              loading={pageState.isLoading}
              paginationModel={{ page: pageState.page, pageSize: pageState.pageSize }}
              onPaginationModelChange={(model, details) => {
                setPageState((old) => ({ ...old, page: model.page, pageSize: model.pageSize }));
              }}
              columns={columns}
              pageSizeOptions={[5, 10, 30, 50]}
              paginationMode='server'
              disableColumnFilter
              onRowClick={handleRowClick}
              hideFooterSelectedRowCount
              // slots={{
              //   toolbar: EditToolbar
              // }}
            />
          </Stack>
        </Container>
      </TabPanel>
      <TabPanel value='2'>Item Two</TabPanel>
      <Dialog
        aria-labelledby='customized-dialog-title'
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Tạo danh mục
        </DialogTitle>
        <IconButton
          aria-label='close'
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
          onClick={() => setOpenCreateDialog(false)}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack spacing={1}>
            <Textarea name='Outlined' placeholder='Tên danh mục' variant='outlined' minRows={1} />
            <Textarea
              name='Outlined'
              placeholder='Thông tin danh mục'
              variant='outlined'
              minRows={4}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button btnType={BtnType.Primary} onClick={() => setOpenCreateDialog(false)}>
            <ParagraphBody> Lưu</ParagraphBody>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuestionBankManagement;
