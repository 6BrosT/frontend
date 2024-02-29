import { useMatches, useParams } from "react-router-dom";
import { Box, Stack, Grid, Container, Divider } from "@mui/material";

import Typography from "@mui/joy/Typography";

import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridColDef,
  GridRowModesModel,
  GridActionsCellItem,
  GridEventListener
} from "@mui/x-data-grid";
import SearchBar from "components/common/search/SearchBar";
import { red, grey } from "@mui/material/colors";
import { useNavigate, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { routes } from "routes/routes";
import Button, { BtnType } from "components/common/buttons/Button";

import classes from "./styles.module.scss";
import ParagraphBody from "components/text/ParagraphBody";
import PickQuestionTypeToAddDialog from "pages/lecturer/ExamManagemenent/CreateExam/components/PickQuestionTypeToAddDialog";
import qtype from "utils/constant/Qtype";

const rows = [
  {
    id: 1,
    questionName: "Con trỏ là gì?",
    createdAtBy: { name: "Nguyễn Quốc Tuấn", time: "02/12/2023 10:30AM" },
    updatedAtBy: { name: "Dương Chí Thông", time: "05/12/2023 10:30PM" },
    qtype: "Nhiều lựa chọn"
  },
  {
    id: 2,
    questionName: "Stack và Queue llllllllllllllllllllllllllllllà gì?",
    createdAtBy: { name: "Nguyễn Quốc Tuấn", time: "02/12/2023 10:30AM" },
    updatedAtBy: { name: "Dương Chí Thông", time: "05/12/2023 10:30PM" },
    qtype: "Tự luận"
  }
];
const QuestionListOfCourse = () => {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: rows,
    total: 0,
    page: 1,
    pageSize: 5
  });
  const columns: GridColDef[] = [
    {
      field: "stt",
      headerName: "STT",
      sortable: false,
      width: 20,
      align: "center",
      headerClassName: "qbm-class"
    },
    {
      field: "questionName",
      headerName: "Tên câu hỏi",
      sortable: false,
      flex: 3,
      renderCell: (params) => <span>{params.row.questionName}</span>,
      headerClassName: "qbm-class"
    },
    {
      field: "created",
      headerName: "Ngày tạo bởi",
      sortable: false,
      flex: 3,
      renderCell: (params) => (
        <div>
          <div>{params.row.createdAtBy.name}</div>
          <div>{params.row.createdAtBy.time}</div>
        </div>
      ),
      headerClassName: "qbm-class"
    },
    {
      field: "updated",
      headerName: "Lần chỉnh sửa cuối bởi",
      sortable: false,
      flex: 3,
      renderCell: (params) => (
        <div>
          <div>{params.row.updatedAtBy.name}</div>
          <div>{params.row.updatedAtBy.time}</div>
        </div>
      ),
      headerClassName: "qbm-class"
    },
    {
      field: "qtype",
      headerName: "Phân loại",
      sortable: false,
      flex: 2,
      headerClassName: "qbm-class"
    },
    {
      field: "operation",
      headerName: "Tác vụ",
      sortable: false,
      flex: 2,
      type: "actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem icon={<PreviewIcon />} label='Preview' onClick={() => null} />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            sx={{
              color: "primary.main"
            }}
            onClick={() => handleCreateQuestion()}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            className='textPrimary'
            onClick={() => null}
            sx={{
              color: red[500]
            }}
          />
        ];
      },
      headerClassName: "qbm-class"
    }
  ];

  useEffect(() => {
    //fetch data
  }, [pageState.page, pageState.pageSize]);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.reset === true) setIsAddingQuestion(false);
  }, [location]);

  useEffect(() => {
    const handlePopstate = () => setIsAddingQuestion(false);

    // Đăng ký sự kiện popstate
    window.addEventListener("popstate", handlePopstate);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
  const navigate = useNavigate();

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    console.log(params);
    // navigate(`${params.row.id}`);
  };
  const handleCreateQuestion = () => {
    setIsAddingQuestion(true);
    setIsAddNewQuestionDialogOpen(false);
    navigate(`create/${typeToCreateNewQuestion}`);
  };

  const [assignmentTypes, setAssignmentTypes] = useState(["Tự luận", "Nộp tệp"]);
  const urlParams = useParams();
  console.log(urlParams);
  const [isAddNewQuestionDialogOpen, setIsAddNewQuestionDialogOpen] = useState(false);
  const [typeToCreateNewQuestion, setTypeToCreateNewQuestion] = useState(qtype.essay.code);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const matches = useMatches();
  // console.log(matches);
  const [value, setValue]: any[] = useOutletContext();
  useEffect(() => {
    setIsAddingQuestion(false);
  }, [value]);
  return (
    <div>
      <PickQuestionTypeToAddDialog
        open={isAddNewQuestionDialogOpen}
        handleClose={() => setIsAddNewQuestionDialogOpen(false)}
        title='Chọn kiểu câu hỏi muốn thêm'
        cancelText='Hủy bỏ'
        confirmText='Thêm'
        onHanldeConfirm={handleCreateQuestion}
        onHandleCancel={() => setIsAddNewQuestionDialogOpen(false)}
        questionType={typeToCreateNewQuestion}
        handleChangeQuestionType={setTypeToCreateNewQuestion}
      />
      {isAddingQuestion && <Outlet />}
      {!isAddingQuestion && (
        <TabPanel value='1' sx={{ padding: 0 }}>
          <Box className={classes.tabWrapper}>
            <ParagraphBody className={classes.breadCump} colorName='--gray-50' fontWeight={"600"}>
              <span onClick={() => navigate(`/${routes.lecturer.question_bank.path}`)}>
                Ngân hàng câu hỏi chung
              </span>{" "}
              {"> "}
              <span onClick={() => navigate(".")}>Học thuật toán</span>
            </ParagraphBody>
          </Box>
          <Container maxWidth='md'>
            <Stack spacing={2} marginBottom={3}>
              <Typography level='h1'>Học thuật toán</Typography>
              <Typography>Thông tin danh mục: các bài tập về thuật toán</Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                <Button btnType={BtnType.Outlined}>
                  <ParagraphBody>Export câu hỏi ra file</ParagraphBody>
                </Button>
                <Button
                  btnType={BtnType.Outlined}
                  onClick={() => setIsAddNewQuestionDialogOpen(true)}
                >
                  <ParagraphBody> Thêm câu hỏi</ParagraphBody>
                </Button>
              </Stack>

              <SearchBar onSearchClick={() => null} placeHolder='Nhập tên câu hỏi ...' />
              <DataGrid
                sx={{
                  "& .MuiDataGrid-columnHeader": { backgroundColor: grey[100] }
                }}
                autoHeight
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
                hideFooterSelectedRowCount
                // onRowClick={handleRowClick}
                // slots={{
                //   toolbar: EditToolbar
                // }}
              />
            </Stack>
          </Container>
        </TabPanel>
      )}
      {!isAddingQuestion && <TabPanel value='2'>Item Two</TabPanel>}
    </div>
  );
};

export default QuestionListOfCourse;
