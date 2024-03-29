import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Grid, IconButton, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { GridColumnMenu, GridRowParams } from "@mui/x-data-grid";
import { GridColumnMenuItemProps } from "@mui/x-data-grid/components/menu/columnMenu/GridColumnMenuItemProps";
import { GridColumnMenuProps } from "@mui/x-data-grid/components/menu/columnMenu/GridColumnMenuProps";
import { GridCallbackDetails } from "@mui/x-data-grid/models/api/gridCallbackDetails";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridColumnGroupingModel } from "@mui/x-data-grid/models/gridColumnGrouping";
import { GridPaginationModel } from "@mui/x-data-grid/models/gridPaginationProps";
import { GridRowSelectionModel } from "@mui/x-data-grid/models/gridRowSelectionModel";
import Heading1 from "components/text/Heading1";
import CustomDataGrid from "../../../../../../../components/common/CustomDataGrid";
import CourseGradeFeatureBar from "./components/FeatureBar";
import classes from "./styles.module.scss";
import { useTranslation } from "react-i18next";

function CustomAssignmentEdit(props: GridColumnMenuItemProps) {
  const { customEditHandler, customEditValue } = props;
  return (
    <MenuItem onClick={customEditHandler}>
      <ListItemIcon>
        <EditIcon fontSize='small' />
      </ListItemIcon>
      <ListItemText>{customEditValue}</ListItemText>
    </MenuItem>
  );
}

function CustomColumnMenu(props: GridColumnMenuProps) {
  const { t } = useTranslation();
  const currentColField = props.colDef.field;
  const canHaveCustomColMenu =
    currentColField !== "name" && currentColField !== "id" && currentColField !== "email";
  return canHaveCustomColMenu ? (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuUserItem: CustomAssignmentEdit
      }}
      slotProps={{
        columnMenuUserItem: {
          displayOrder: 0,
          customEditValue: t("common_edit"),
          customEditHandler: () => alert("Custom handler fired")
        }
      }}
      translation-key='common_edit'
    />
  ) : (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuUserItem: null
      }}
      slotProps={{
        columnMenuSortItem: {
          value: t("data_grid_row_ascending")
        }
      }}
      translation-key='data_grid_row_ascending'
    />
  );
}

const LecturerCourseGrade = () => {
  const { t } = useTranslation();
  const courseAssignmentList = [
    { id: 1, name: "Bài tập 1", range: 100 },
    { id: 2, name: "Bài tập 2", range: 10 },
    { id: 3, name: "Bài tập 3", range: 10 },
    { id: 4, name: "Bài kiểm tra 1", range: 10 },
    { id: 5, name: "Bài kiểm tra 2", range: 10 }
  ];
  const groupChildren = courseAssignmentList.map((assignment) => {
    return { field: `${assignment.id}-${assignment.name}` };
  });
  const tableHeading: GridColDef[] = [
    { field: "id", headerName: "STT", minWidth: 1 },
    {
      field: "name",
      headerName: t("common_fullname"),
      width: 100,
      flex: 0.2,
      disableColumnMenu: true
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      disableColumnMenu: true,
      flex: 0.2
    }
  ];
  courseAssignmentList.map((assignment) =>
    tableHeading.push({
      field: `${assignment.id}-${assignment.name}`,
      headerName: assignment.name,
      renderCell: (params: any) => (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          {params.value} /{assignment.range}
          <IconButton sx={{ marginLeft: "auto" }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      ),
      flex: 0.2
    })
  );
  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "score",
      headerName: t("common_grade"),
      description: t("course_lecturer_grade_description"),
      freeReordering: true,
      children: groupChildren
    }
  ];

  const participantList = [
    {
      id: 4,
      name: "Trương Gia Tiến",
      email: "truongtien577@gmail.com",
      roles: "JD"
    },
    { id: 2, name: "Đặng Ngọc Tiến", email: "dnt@gmail.com", roles: 2 },
    { id: 3, name: "Nguyễn Quốc Tuấn", email: "nqt@gmail.com", roles: 3 },
    { id: 1, name: "Dương Chí Thông", email: "nqt@gmail.com", roles: 3 },
    { id: 5, name: "Nguyễn Văn A", email: "nqt@gmail.com", roles: 3 },
    { id: 6, name: "Nguyễn Văn B", email: "nqt@gmail.com", roles: 3 },
    { id: 7, name: "Nguyễn Văn C", email: "nqt@gmail.com", roles: 3 }
  ];

  const visibleColumnList = { id: false, name: true, email: true, role: true, action: true };
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

  const rowClickHandler = (params: GridRowParams<any>) => {
    console.log(params);
  };

  return (
    <Box className={classes.gradeBody}>
      <Grid item xs={12}>
        <Heading1 translation-key='course_grade_title'>{t("course_grade_title")}</Heading1>
      </Grid>
      <Grid item xs={12}>
        <CourseGradeFeatureBar />
      </Grid>
      <Grid item xs={12}>
        <CustomDataGrid
          dataList={participantList}
          tableHeader={tableHeading}
          onSelectData={rowSelectionHandler}
          visibleColumn={visibleColumnList}
          dataGridToolBar={dataGridToolbar}
          page={page}
          pageSize={pageSize}
          totalElement={totalElement}
          onPaginationModelChange={pageChangeHandler}
          columnGroupingModel={columnGroupingModel}
          showVerticalCellBorder={true}
          customColumnMenu={CustomColumnMenu}
          onClickRow={rowClickHandler}
        />
      </Grid>
    </Box>
  );
};

export default LecturerCourseGrade;
