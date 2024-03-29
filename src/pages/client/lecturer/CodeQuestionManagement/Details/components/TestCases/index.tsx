import { Box } from "@mui/material";
import React, { memo, useState } from "react";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import TestCasePopup from "./components/PopupTestCase";
import Heading5 from "components/text/Heading5";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmAlert from "components/common/dialogs/ConfirmAlert";
import { useTranslation } from "react-i18next";

type Props = {};

const CodeQuestionTestCases = memo((props: Props) => {
  const { t } = useTranslation();
  const [openTestCasePopup, setOpenTestCasePopup] = useState<boolean>(false);
  const [openConfirmAlert, setOpenConfirmAlert] = useState<boolean>(false);
  const [itemEdit, setItemEdit] = useState<any>(null);

  const initialRows: GridRowsProp = [
    {
      id: 1,
      input: "input01",
      output: "output01",
      inputValue: "1\n2",
      outputValue: "3",
      isSample: true,
      score: 0
    },
    {
      id: 2,
      input: "input02",
      output: "output02",
      inputValue: "3\n2",
      outputValue: "5",
      isSample: true,
      score: 10
    },
    {
      id: 3,
      input: "input03",
      output: "output03",
      inputValue: "2\n2",
      outputValue: "4",
      isSample: true,
      score: 100
    },
    {
      id: 4,
      input: "input04",
      output: "output04",
      inputValue: "3\n3",
      outputValue: "6",
      isSample: false,
      score: 5
    },
    {
      id: 5,
      input: "input05",
      output: "output05",
      inputValue: "5\n2",
      outputValue: "7",
      isSample: false,
      score: 10
    },
    {
      id: 6,
      input: "input06",
      output: "output06",
      inputValue: "2\n12",
      outputValue: "14",
      isSample: false,
      score: 10
    }
  ];

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setItemEdit(rows.find((row: any) => row.id === id));
    setOpenTestCasePopup(true);
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setOpenConfirmAlert(true);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: t("common_num_order"), width: 100, editable: false },
    {
      field: "input",
      headerName: t("detail_problem_input"),
      type: "text",
      width: 200,
      align: "left",
      headerAlign: "left",
      editable: false
    },
    {
      field: "output",
      headerName: t("detail_problem_output"),
      width: 200,
      type: "text",
      align: "left",
      headerAlign: "left",
      editable: false
    },
    {
      field: "isSample",
      width: 150,
      headerName: t("common_template"),
      editable: true,
      type: "boolean"
    },
    {
      field: "score",
      headerName: t("common_score"),
      width: 150,
      editable: true,
      type: "number"
    },
    {
      field: "actions",
      type: "actions",
      headerName: t("common_action"),
      width: 300,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon className={classes.icon} />}
              label='Save'
              sx={{
                color: "primary.main"
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon className={classes.icon} />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon className={classes.icon} />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon className={classes.icon} />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />
        ];
      }
    }
  ];

  const handleDelete = () => {
    setOpenConfirmAlert(false);
  };

  return (
    <Box className={classes["body"]}>
      <Box className={classes["head-wrapper"]}>
        <Heading5
          translation-key='code_management_detail_test_case_description'
          fontStyle={"italic"}
          fontWeight={"400"}
          colorname='--gray-50'
        >
          {t("code_management_detail_test_case_description")}{" "}
        </Heading5>
        <Box className={classes["btn-wrapper"]}>
          <Button btnType={BtnType.Outlined} translation-key='code_management_detail_upload_zip'>
            {t("code_management_detail_upload_zip")}
          </Button>
          <Button
            translation-key='code_management_detail_add_test_case'
            btnType={BtnType.Primary}
            onClick={() => setOpenTestCasePopup(true)}
          >
            {t("code_management_detail_add_test_case")}
          </Button>
        </Box>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        className={classes.dataGrid}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel }
        }}
      />
      <TestCasePopup
        itemEdit={itemEdit}
        open={openTestCasePopup}
        setOpen={setOpenTestCasePopup}
        setItemEdit={setItemEdit}
      />
      <ConfirmAlert
        open={openConfirmAlert}
        setOpen={setOpenConfirmAlert}
        title={t("code_management_detail_delete_confirm")}
        content={t("code_management_detail_delete_confirm_question")}
        handleDelete={handleDelete}
        translation-key={[
          "code_management_detail_delete_confirm_question",
          "code_management_detail_delete_confirm"
        ]}
      />
    </Box>
  );
});

export default CodeQuestionTestCases;
