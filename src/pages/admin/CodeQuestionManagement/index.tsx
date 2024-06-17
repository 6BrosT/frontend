import { Box, Card, Divider, Grid, TablePagination } from "@mui/material";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import TableTemplate from "components/common/table/TableTemplate";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading1 from "components/text/Heading1";
import { routes } from "routes/routes";
import SearchBar from "components/common/search/SearchBar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { QuestionService } from "services/courseService/QuestionService";
import { clearCodeQuestion, setQuestions } from "reduxes/courseService/question";
import dayjs from "dayjs";
import {
  GridActionsCellItem,
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridRowSelectionModel
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import ConfirmDelete from "components/common/dialogs/ConfirmDelete";
import ParagraphSmall from "components/text/ParagraphSmall";
import CustomSearchFeatureBar from "components/common/featurebar/CustomSearchFeaturebar";
import CustomDataGrid from "components/common/CustomDataGrid";
import React from "react";
import { QuestionDifficultyEnum } from "models/coreService/enum/QuestionDifficultyEnum";
import { CoreCodeQuestionService } from "services/coreService/CoreCodeQuestionService";
import { setCodeQuestions } from "reduxes/coreService/CodeQuestion";
import ParagraphBody from "components/text/ParagraphBody";
import { setSuccessMess } from "reduxes/AppStatus";

interface AddContestProblemDialogQuestionInterface {
  id: string;
  questionId: string;
  no: number;
  name: string;
  difficulty: string;
  isPublic: boolean;
  maxGrade: number;
  defaultMark: number;
}

const AdminCodeQuestionManagement = () => {
  const breadcumpRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const codeQuestionState = useSelector((state: RootState) => state.codeQuestion);
  const searchHandle = async (searchText: string) => {
    setSearchText(searchText);
  };
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const tableHeading: GridColDef[] = [
    {
      field: "stt",
      sortable: false,
      flex: 0.7,
      align: "center",
      headerName: t("common_no")
    },
    {
      field: "name",
      sortable: false,
      flex: 2.5,
      headerName: t("code_question_name")
    },
    {
      field: "difficulty",
      sortable: false,
      flex: 1.5,
      headerName: t("code_question_difficulty"),
      renderCell: (params) => {
        return (
          <ParagraphBody>
            {params.row.difficulty === "HARD"
              ? t("common_hard")
              : params.row.difficulty === "MEDIUM"
                ? t("common_medium")
                : params.row.difficulty === "EASY"
                  ? t("common_easy")
                  : "Không xác định"}
          </ParagraphBody>
        );
      }
    },
    {
      field: "updated",
      sortable: false,
      flex: 2,
      headerName: t("code_question_updated"),
      renderCell: (params) => (
        <div>
          <ParagraphBody>{params.row.updatedByName}</ParagraphBody>
          <div>{dayjs(params.row.updatedAt).format("DD/MM/YYYY HH:mm")}</div>
        </div>
      )
    },
    {
      field: "operation",
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
              // todo edit question
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Cancel'
            className='textPrimary'
            onClick={() => {
              setDeletedCodeQuestionId(id as string);
              setIsOpenConfirmDelete(true);
            }}
            sx={{
              color: red[500]
            }}
          />
        ];
      },
      headerName: t("common_action")
    }
  ];

  const dispatch = useDispatch();

  const handleGetAdminCodeQuestions = React.useCallback(
    async ({
      search,
      isPublic,
      difficulty,
      pageNo = 0,
      pageSize = 5
    }: {
      search?: string;
      isPublic?: boolean;
      difficulty?: QuestionDifficultyEnum;
      pageNo?: number;
      pageSize?: number;
    }) => {
      setIsLoading(true);
      try {
        const getAdminCodeQuestionsResponse = await CoreCodeQuestionService.getAdminCodeQuestions({
          search,
          isPublic,
          difficulty,
          pageNo,
          pageSize
        });
        dispatch(setCodeQuestions(getAdminCodeQuestionsResponse));
        setIsLoading(false);
      } catch (error: any) {
        console.error("error", error);
        setIsLoading(false);
      }
    },
    []
  );

  const handleGetQuestions = async ({
    search = searchText,
    pageNo = page,
    pageSize = rowsPerPage
  }: {
    search?: string;
    pageNo?: number;
    pageSize?: number;
  }) => {
    try {
      const getQuestionResponse = await QuestionService.getQuestions({
        search,
        pageNo,
        pageSize
      });
      dispatch(setQuestions(getQuestionResponse));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteQuestion = async (questionId: string) => {
    try {
      await QuestionService.deleteQuestion(questionId);
      handleGetQuestions({ search: searchText });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchInitialQuestions = async () => {
      await handleGetQuestions({ search: searchText });
      await handleGetAdminCodeQuestions({ search: searchText });
    };
    fetchInitialQuestions();
  }, [searchText]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    handleGetQuestions({ search: searchText, pageNo: newPage, pageSize: rowsPerPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    handleGetQuestions({ search: searchText, pageNo: 0, pageSize: +event.target.value });
  };

  const navigate = useNavigate();
  const onEdit = (questionId: number) => {
    navigate(
      routes.lecturer.code_question.information.replace(":questionId", questionId.toString())
    );
  };
  const onDelete = (questionId: number) => {
    handleDeleteQuestion(questionId.toString());
  };
  const [deletedCodeQuestionId, setDeletedCodeQuestionId] = useState<string>("");
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const onCancelConfirmDelete = () => {
    setIsOpenConfirmDelete(false);
  };
  const onDeleteConfirmDelete = async () => {
    QuestionService.deleteQuestion(deletedCodeQuestionId)
      .then(() => {
        dispatch(setSuccessMess("Delete code question successfully"));
        dispatch(clearCodeQuestion());
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSuccessMess("Delete code question failed"));
      })
      .finally(() => {
        setIsOpenConfirmDelete(false);
      });
  };

  const dataGridToolbar = { enableToolbar: true };
  const rowSelectionHandler = (
    selectedRowId: GridRowSelectionModel,
    details: GridCallbackDetails<any>
  ) => {};
  const totalElement = useMemo(
    () => codeQuestionState.totalItems || 0,
    [codeQuestionState.questions]
  );

  const pageChangeHandler = (model: GridPaginationModel, details: GridCallbackDetails<any>) => {
    setPage(model.page);
    setRowsPerPage(model.pageSize);
    handleGetAdminCodeQuestions({
      search: searchText,
      pageNo: model.page,
      pageSize: model.pageSize
    });
  };

  const rowClickHandler = (params: GridRowParams<any>) => {
    console.log(params);
  };

  return (
    <>
      <ConfirmDelete
        isOpen={isOpenConfirmDelete}
        title={"Confirm delete"}
        description='Are you sure you want to delete this question?'
        onCancel={onCancelConfirmDelete}
        onDelete={onDeleteConfirmDelete}
      />
      <Card
        sx={{
          margin: "20px",
          "& .MuiDataGrid-root": {
            border: "1px solid #e0e0e0",
            borderRadius: "4px"
          }
        }}
      >
        <Box className={classes.breadcump} ref={breadcumpRef}>
          <Box id={classes.breadcumpWrapper}>
            <ParagraphSmall colorname='--blue-500' translate-key='code_management_title'>
              {t("code_management_title")}
            </ParagraphSmall>
          </Box>
        </Box>
        <Divider />
        <Grid
          container
          spacing={2}
          sx={{
            padding: "20px"
          }}
        >
          <Grid item xs={12}>
            <Heading1 translate-key='code_management_title'>{t("code_management_title")}</Heading1>
          </Grid>
          <Grid item xs={12}>
            <CustomSearchFeatureBar
              isLoading={codeQuestionState.isLoading}
              searchValue={searchText}
              setSearchValue={setSearchText}
              onHandleChange={searchHandle}
              createBtnText={t("code_management_create_new_title")}
              onClickCreate={() => {
                navigate(routes.admin.users.create);
              }}
              isFilter={false}
            />
          </Grid>
          <Grid item xs={12}>
            {/* #F5F9FB */}
            <CustomDataGrid
              loading={codeQuestionState.isLoading}
              dataList={codeQuestionState.questions.map((question, index) => ({
                stt: index + 1,
                id: question.question.id,
                name: question.question.name,
                difficulty: question.question.difficulty,
                updatedByName:
                  question.question.updatedBy.lastName +
                  " " +
                  question.question.updatedBy.firstName,
                updated: question.question.updatedAt
              }))}
              tableHeader={tableHeading}
              onSelectData={rowSelectionHandler}
              dataGridToolBar={dataGridToolbar}
              page={page}
              pageSize={rowsPerPage}
              totalElement={totalElement}
              onPaginationModelChange={pageChangeHandler}
              showVerticalCellBorder={true}
              onClickRow={rowClickHandler}
              sx={{
                "& .MuiDataGrid-cell": {
                  border: "none"
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f9fb"
                },
                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor: "#f5f9fb"
                }
              }}
              personalSx={true}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default AdminCodeQuestionManagement;
