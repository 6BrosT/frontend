import { Box, Grid, Paper } from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams } from "react-router-dom";
import classes from "./styles.module.scss";
import Heading1 from "components/text/Heading1";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRowSelectionModel } from "@mui/x-data-grid/models/gridRowSelectionModel";
import { GridCallbackDetails } from "@mui/x-data-grid/models/api/gridCallbackDetails";
import { GridActionsCellItem } from "@mui/x-data-grid/components/cell/GridActionsCellItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridPaginationModel } from "@mui/x-data-grid/models/gridPaginationProps";
import CourseParticipantFeatureBar from "./components/FeatureBar";
import CustomDataGrid from "components/common/CustomDataGrid";
import { GridRowParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourseUser } from "reduxes/courseService/courseUser";
import { CourseUserService } from "services/courseService/CourseUserService";
import { AppDispatch, RootState } from "store";

const LecturerCourseParticipant = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const courseUserState = useSelector((state: RootState) => state.courseUser);
  const searchHandle = async (searchText: string) => {
    setSearchText(searchText);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { courseId } = useParams<{ courseId: string }>();
  const handleGetCourseUser = async ({
    search = searchText,
    pageNo = currentPage,
    pageSize = rowsPerPage
  }: {
    search?: string;
    pageNo?: number;
    pageSize?: number;
  }) => {
    try {
      const getCourseUserResponse = await CourseUserService.getUserByCourseId(courseId ?? "", {
        search,
        pageNo,
        pageSize
      });
      console.log(getCourseUserResponse);
      dispatch(setCourseUser(getCourseUserResponse));
    } catch (error) {
      console.error("Failed to fetch course user", error);
    }
  };

  useEffect(() => {
    handleGetCourseUser({ search: searchText });
  }, [searchText]);

  const { t } = useTranslation();

  const tableHeading: GridColDef[] = [
    { field: "id", headerName: "STT", minWidth: 1 },
    {
      field: "name",
      headerName: t("common_fullname"),
      width: 200,
      flex: 0.8,
      renderCell: (params) => (
        <Link component={RouterLink} to={`${params.row.id}`}>
          {params.value}
        </Link>
      )
    },
    { field: "email", headerName: "Email", width: 200, flex: 0.8 },
    { field: "roles", headerName: t("common_role"), width: 50, flex: 0.4 },
    {
      field: "action",
      headerName: t("common_action"),
      type: "actions",
      width: 200,
      flex: 0.5,
      getActions: () => [
        <GridActionsCellItem icon={<EditIcon />} label='Edit' />,
        <GridActionsCellItem icon={<DeleteIcon />} label='Delete' />
      ]
    }
  ];
  const visibleColumnList = { id: false, name: true, email: true, role: true, action: false };
  const dataGridToolbar = { enableToolbar: true };
  const rowSelectionHandler = (
    selectedRowId: GridRowSelectionModel,
    details: GridCallbackDetails<any>
  ) => {};
  const pageChangeHandler = (model: GridPaginationModel, details: GridCallbackDetails<any>) => {
    setCurrentPage(model.page);
    setRowsPerPage(model.pageSize);
    handleGetCourseUser({ search: searchText, pageNo: model.page, pageSize: model.pageSize });
  };

  const rowClickHandler = (params: GridRowParams<any>) => {
    console.log(params);
  };

  return (
    <Box className={classes.participantBody}>
      <Grid item xs={12}>
        <Heading1>Danh sách thành viên</Heading1>
      </Grid>
      <Grid item xs={12}>
        <CourseParticipantFeatureBar />
      </Grid>
      <Grid item xs={12}>
        <CustomDataGrid
          dataList={courseUserState.users.map((user, index) => ({
            id: user.userId,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            roles: user.role
          }))}
          tableHeader={tableHeading}
          onSelectData={rowSelectionHandler}
          visibleColumn={visibleColumnList}
          dataGridToolBar={dataGridToolbar}
          page={currentPage}
          pageSize={rowsPerPage}
          totalElement={courseUserState.totalItems}
          onPaginationModelChange={pageChangeHandler}
          showVerticalCellBorder={false}
          onClickRow={rowClickHandler}
        />
      </Grid>
    </Box>
  );
};

export default LecturerCourseParticipant;
