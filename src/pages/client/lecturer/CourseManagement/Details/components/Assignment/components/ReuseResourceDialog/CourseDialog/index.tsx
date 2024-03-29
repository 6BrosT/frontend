import { Grid, Link } from "@mui/material";
import { DialogProps } from "@mui/material/Dialog";
import { GridCallbackDetails } from "@mui/x-data-grid/models/api/gridCallbackDetails";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridPaginationModel } from "@mui/x-data-grid/models/gridPaginationProps";
import { GridRowSelectionModel } from "@mui/x-data-grid/models/gridRowSelectionModel";
import CustomDataGrid from "components/common/CustomDataGrid";
import CustomDialog from "components/common/dialogs/CustomDialog";
import * as React from "react";
import FeatureBar from "../../FeatureBar";
import { GridRowParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

interface ReusedCourseResourceDialogProps extends DialogProps {
  title?: string;
  handleClose: () => void;
  onOpenReuseResourceDialog: () => void;
}

export default function ReusedCourseResourceDialog({
  open,
  title,
  handleClose,
  onOpenReuseResourceDialog,
  ...props
}: ReusedCourseResourceDialogProps) {
  const { t } = useTranslation();
  const questionList = [
    {
      id: 1,
      name: "Nhập môn lập trình - 20CLC",
      program: "Chất lượng cao",
      teacher: "Nguyễn Văn A và Nguyễn Văn B"
    },
    {
      id: 2,
      name: "Kỹ thuật lập trình - 20CLC",
      program: "Chất lượng cao",
      teacher: "Nguyễn Văn A và Nguyễn Văn B"
    },
    {
      id: 3,
      name: "Cấu trúc dữ liệu và giải thuật - 20CLC",
      program: "Chất lượng cao",
      teacher: "Nguyễn Văn A và Nguyễn Văn B"
    },
    {
      id: 4,
      name: "Lập trình hướng đối tượng - 20APCS",
      program: "Chương trình tiên tiến",
      teacher: "Nguyễn Văn A và Nguyễn Văn B"
    }
  ];
  const tableHeading: GridColDef[] = React.useMemo(
    () => [
      { field: "id", headerName: "STT", minWidth: 1 },
      {
        field: "name",
        headerName: t("course_lecturer_reuse_course_resource_dialog_grid_class"),
        minWidth: 400
      },
      {
        field: "program",
        headerName: t("course_lecturer_reuse_course_resource_dialog_grid_program"),
        minWidth: 200
      },
      {
        field: "teacher",
        headerName: t("course_lecturer_reuse_course_resource_dialog_grid_teacher"),
        minWidth: 400
      }
    ],
    []
  );

  const visibleColumnList = { id: false, name: true, email: true, role: true, action: true };
  const dataGridToolbar = { enableToolbar: true };

  const rowSelectionHandler = (
    selectedRowId: GridRowSelectionModel,
    details: GridCallbackDetails<any>
  ) => {};

  const rowClickHandler = (params: GridRowParams<any>) => {
    onOpenReuseResourceDialog();
  };
  const pageChangeHandler = (model: GridPaginationModel, details: GridCallbackDetails<any>) => {
    console.log(model);
  };
  const page = 0;
  const pageSize = 5;
  const totalElement = 100;

  return (
    <>
      <CustomDialog
        open={open}
        handleClose={handleClose}
        title={title}
        minWidth='1000px'
        actionsDisabled
        {...props}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FeatureBar
              colSearchLabel={t("common_find_by_col")}
              colItems={[
                {
                  label: t("course_lecturer_reuse_course_resource_dialog_grid_class"),
                  value: "name"
                },
                {
                  label: t("course_lecturer_reuse_course_resource_dialog_grid_program"),
                  value: "program"
                }
              ]}
              translation-key={[
                "course_lecturer_reuse_course_resource_dialog_grid_class",
                "course_lecturer_reuse_course_resource_dialog_grid_program",
                "common_find_by_col"
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomDataGrid
              dataList={questionList}
              tableHeader={tableHeading}
              onSelectData={rowSelectionHandler}
              visibleColumn={visibleColumnList}
              dataGridToolBar={dataGridToolbar}
              page={page}
              pageSize={pageSize}
              totalElement={totalElement}
              onPaginationModelChange={pageChangeHandler}
              showVerticalCellBorder={false}
              onClickRow={rowClickHandler}
            />
          </Grid>
        </Grid>
      </CustomDialog>
    </>
  );
}
