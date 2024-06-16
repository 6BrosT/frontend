import { API } from "constants/API";
import { UUID } from "crypto";
import { TagEntity } from "models/codeAssessmentService/entity/TagEntity";
import { QuestionDifficultyEnum } from "models/coreService/enum/QuestionDifficultyEnum";
import api from "utils/api";

const codeAssessmentServiceApiUrl = process.env.REACT_APP_CODE_ASSESSMENT_SERVICE_API_URL || "";

export class CodeQuestionService {
  static async getRecommendedCodeQuestion() {
    try {
      const response = await api({
        baseURL: codeAssessmentServiceApiUrl
      }).get(API.CODE_ASSESSMENT.CODE_QUESTION.RECOMMENED);
      console.log(response.data, response.status);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      console.error("Failed to fetch code questions", error);
      return Promise.reject({
        code: error.response?.data?.code || 503,
        status: error.response?.data?.status || "Service Unavailable",
        message: error.response?.data?.message || error.message
      });
    }
  }
  static async getCodeQuestion(
    filter: {
      tag: TagEntity[] | null;
      search: string | null;
      difficulty: QuestionDifficultyEnum | null;
      solved: boolean | null;
    },
    pagination: {
      pageSize: number;
      pageNum: number;
    }
  ) {
    try {
      const response = await api({
        baseURL: codeAssessmentServiceApiUrl
      }).get(`${API.CODE_ASSESSMENT.CODE_QUESTION.DEFAULT}`, {
        params: {
          pageNo: pagination.pageNum,
          pageSize: pagination.pageSize,
          tagIds: filter.tag?.map((value) => value.id).join(", "),
          search: filter.search,
          difficulty: filter.difficulty,
          solved: filter.solved
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      console.error("Failed to fetch code questions", error);
      return Promise.reject({
        code: error.response?.data?.code || 503,
        status: error.response?.data?.status || "Service Unavailable",
        message: error.response?.data?.message || error.message
      });
    }
  }

  static async getDetailCodeQuestion(codeQuestionId: UUID | string) {
    try {
      const response = await api({
        baseURL: codeAssessmentServiceApiUrl
        // isAuthorization: true
      }).get(`${API.CODE_ASSESSMENT.CODE_QUESTION.GET_BY_ID.replace(":id", codeQuestionId)}`);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      console.error("Failed to fetch algorithm tags", error);
      return Promise.reject({
        code: error.response?.data?.code || 503,
        status: error.response?.data?.status || "Service Unavailable",
        message: error.response?.data?.message || error.message
      });
    }
  }

  static async getAdminCodeQuestions({
    search,
    isPublic,
    difficulty,
    pageNo,
    pageSize
  }: {
    search?: string;
    isPublic?: boolean;
    difficulty?: QuestionDifficultyEnum;
    pageNo: number;
    pageSize: number;
  }) {
    try {
      const response = await api({
        baseURL: codeAssessmentServiceApiUrl
      }).get(API.CODE_ASSESSMENT.CODE_QUESTION.ADMIN_CODE_QUESTION, {
        params: {
          pageNo,
          pageSize,
          search,
          isPublic,
          difficulty
        }
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      console.error("Failed to fetch admin code questions", error);
      return Promise.reject({
        code: error.response?.data?.code || 503,
        status: error.response?.data?.status || "Service Unavailable",
        message: error.response?.data?.message || error.message
      });
    }
  }
}
