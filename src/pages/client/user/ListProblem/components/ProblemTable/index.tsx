import React from "react";
import { Box } from "@mui/material";
import classes from "./styles.module.scss";

import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { useNavigate } from "react-router";
import { routes } from "routes/routes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ParagraphBody from "components/text/ParagraphBody";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Heading2 from "components/text/Heading2";
import { useTranslation } from "react-i18next";

export default function ProblemTable() {
  const { t } = useTranslation();
  const customHeading = ["Trạng thái", "Tên bài toán", "Độ khó"];
  const renderStatus = (status: number) => {
    if (status === 1) {
      return <CheckCircleIcon className={classes.iconCheck} />;
    }
    return "";
  };

  const renderLevel = (level: number) => {
    if (level === 0) {
      return (
        <ParagraphBody fontWeight={700} colorname={"--blue-500"}>
          Dễ
        </ParagraphBody>
      );
    }
    if (level === 1) {
      return (
        <ParagraphBody fontWeight={700} colorname={"--warning"}>
          Trung bình
        </ParagraphBody>
      );
    }
    return (
      <ParagraphBody fontWeight={700} colorname={"--red-error"}>
        Khó
      </ParagraphBody>
    );
  };
  const data = [
    {
      id: 1,
      status: renderStatus(0),
      name: "Tổng 2 số",
      level: renderLevel(0)
    },
    {
      id: 2,
      status: renderStatus(1),
      name: "Trung bình cộng",
      level: renderLevel(1)
    },
    {
      id: 3,
      status: renderStatus(0),
      name: "Phân số tối giản",
      level: renderLevel(1)
    },
    {
      id: 4,
      status: renderStatus(0),
      name: "Sắp xếp mảng tăng dần",
      level: renderLevel(2)
    },
    {
      id: 5,
      status: renderStatus(1),
      name: "Kiểm tra số nguyên tố",
      level: renderLevel(2)
    },
    {
      id: 6,
      status: renderStatus(1),
      name: "Đảo chuỗi",
      level: renderLevel(2)
    },
    {
      id: 7,
      status: renderStatus(0),
      name: "Tìm phần tử lớn nhất trong mảng",
      level: renderLevel(2)
    },
    {
      id: 8,
      status: renderStatus(1),
      name: "Số Fibonacci",
      level: renderLevel(0)
    },
    {
      id: 9,
      status: renderStatus(0),
      name: "Thuật toán tìm kiếm nhị phân",
      level: renderLevel(2)
    },
    {
      id: 10,
      status: renderStatus(0),
      name: "Đếm số lần xuất hiện của phần tử trong mảng",
      level: renderLevel(1)
    }
  ];
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      <Heading2 translation-key='list_problem'>{t("list_problem")}</Heading2>
      <Box className={classes.table}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='custom table'>
            <TableHead className={classes["table-head"]}>
              <TableRow>
                <TableCell align='center' className={classes.status}>
                  <ParagraphBody fontWeight={700} translation-key='common_status'>
                    {t("common_status")}
                  </ParagraphBody>
                </TableCell>
                <TableCell align='left'>
                  <ParagraphBody fontWeight={700} translation-key='list_problem_problem_name'>
                    {t("list_problem_problem_name")}
                  </ParagraphBody>
                </TableCell>
                <TableCell align='left' className={classes.status}>
                  <ParagraphBody fontWeight={700} translation-key='common_difficult_level'>
                    {t("common_difficult_level")}
                  </ParagraphBody>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.length > 0 &&
                data.map((row, rowIndex) => (
                  <TableRow
                    className={rowIndex % 2 === 0 ? classes.row : classes.row1}
                    key={rowIndex}
                    onClick={() =>
                      navigate(routes.user.problem.detail.description.replace(":problemId", "1"))
                    }
                  >
                    <TableCell align='center'>{row.status}</TableCell>
                    <TableCell className={classes.tableCell}>{row.name}</TableCell>
                    <TableCell>{row.level}</TableCell>
                  </TableRow>
                ))}
              {(!data || data.length === 0) && (
                <TableRow>
                  <TableCell colSpan={customHeading.length}>
                    <ParagraphBody
                      className={classes.noList}
                      translation-key='list_problem_not_found_data'
                    >
                      {t("list_problem_not_found_data")}
                    </ParagraphBody>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          rowsPerPageOptions={[5, 10, 25, 100]}
          count={data.length}
          page={Number(page)}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          translation-key='common_table_row_per_page'
          labelRowsPerPage={t("common_table_row_per_page")} // Thay đổi text ở đây
          onRowsPerPageChange={handleChangeRowsPerPage}
          className={classes.pagination}
        />
      </Box>
    </Box>
  );
}
