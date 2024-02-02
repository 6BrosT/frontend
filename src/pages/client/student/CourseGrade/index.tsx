import { Box, Grid, Paper, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import classes from "./styles.module.scss";
import Heading1 from "components/text/Heading1";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRowSelectionModel } from "@mui/x-data-grid/models/gridRowSelectionModel";
import { GridCallbackDetails } from "@mui/x-data-grid/models/api/gridCallbackDetails";
import { GridPaginationModel } from "@mui/x-data-grid/models/gridPaginationProps";
import CustomDataGrid from "../../../../components/common/CustomDataGrid";
import StudentCourseGradeAssignment from "./components/CourseResource";
import { ECourseResourceType } from "models/courseService/course";

const StudentCourseGrade = () => {
  const courseAssignmentList = [
    {
      id: 1,
      type: ECourseResourceType.assignment,
      item: "Test 1",
      weight: 0,
      grade: undefined,
      range: 100,
      percentage: 10
    },
    {
      id: 2,
      type: ECourseResourceType.assignment,
      item: "Very Long Test 2 Name",
      weight: 0,
      grade: 10,
      range: 100
    },
    {
      id: 3,
      type: ECourseResourceType.assignment,
      item: "Very Test 2 Name",
      weight: 0,
      grade: 10,
      range: 100
    },
    {
      id: 4,
      type: ECourseResourceType.assignment,
      item: "Very 2 Name",
      weight: 0,
      grade: 10,
      range: 100
    },
    {
      id: 5,
      type: ECourseResourceType.assignment,
      item: "Very Name",
      weight: 0,
      grade: 10,
      range: 100
    },
    {
      id: 6,
      type: ECourseResourceType.assignment,
      item: "Very Name",
      weight: 0,
      grade: 10,
      range: 100
    }
  ];
  const tableHeading: GridColDef[] = [
    { field: "id", headerName: "STT", minWidth: 1 },
    {
      field: "item",
      headerName: "Mục được đánh giá",
      width: 200,
      flex: 0.2,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Link href={`${params.row.id}`}>
          <StudentCourseGradeAssignment name={params.value} type={params.row.type} />
        </Link>
      )
    },
    {
      field: "type",
      headerName: "Loại mục",
      minWidth: 1,
      flex: 0.2,
      renderCell: (params) => (
        <Typography>
          {params.value === ECourseResourceType.assignment
            ? "Bài tập"
            : params.value === ECourseResourceType.file
              ? "File"
              : "URL"}
        </Typography>
      )
    },

    {
      field: "weight",
      headerName: "Trọng số",
      minWidth: 50,
      disableColumnMenu: true,
      flex: 0.2
    },
    {
      field: "grade",
      headerName: "Điểm",
      minWidth: 50,
      disableColumnMenu: true,
      flex: 0.2,
      renderCell: (params: any) => (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          {Number(params.value) ? (
            <Typography fontSize={18}>{params.value}</Typography>
          ) : (
            <Typography fontSize={18}>_</Typography>
          )}
          /{params.row.range}
        </Box>
      )
    },
    {
      field: "range",
      headerName: "Thang điểm",
      minWidth: 50,
      disableColumnMenu: true,
      flex: 0.2,
      renderCell: (params: any) => (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          {Number(params.value) ? params.value : "_"}
        </Box>
      )
    },
    {
      field: "percentage",
      headerName: "Phần trăm",
      minWidth: 50,
      disableColumnMenu: true,
      flex: 0.2,
      renderCell: (params: any) => (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          {Number(params.value) ? `${params.value}%` : "_"}
        </Box>
      )
    },
    {
      field: "feedback",
      headerName: "Phản hồi",
      minWidth: 200,
      disableColumnMenu: true,
      flex: 0.2,
      renderCell: (params: any) => (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          {Number(params.value) ? `${params.value}%` : "_"}
        </Box>
      )
    }
  ];

  const visibleColumnList = { id: false, type: true, item: true, grade: true, weight: true };
  const dataGridToolbar = { enableToolbar: true };
  const rowSelectionHandler = (
    selectedRowId: GridRowSelectionModel,
    details: GridCallbackDetails<any>
  ) => {
    console.log(selectedRowId);
  };
  const pageChangeHandler = (model: GridPaginationModel, details: GridCallbackDetails<any>) => {
    console.log(model);
  };
  const page = 0;
  const pageSize = 5;
  const totalElement = 100;

  return (
    <Paper className={classes.container}>
      <Grid container spacing={1} className={classes.gridContainer}>
        <Grid item xs={12}>
          <Heading1>Báo cáo điểm</Heading1>
        </Grid>

        <Grid item xs={12}>
          <CustomDataGrid
            dataList={courseAssignmentList}
            tableHeader={tableHeading}
            onSelectData={rowSelectionHandler}
            visibleColumn={visibleColumnList}
            dataGridToolBar={dataGridToolbar}
            page={page}
            pageSize={pageSize}
            totalElement={totalElement}
            onPaginationModelChange={pageChangeHandler}
            showVerticalCellBorder={true}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentCourseGrade;
