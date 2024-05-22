import axios from "axios";
import { API } from "constants/API";

const courseServiceApiUrl = process.env.REACT_APP_COURSE_SERVICE_API_URL || "";

export class QuestionBankCategoryService {
  static async getQuestionBankCategories({
    search = "",
    pageNo = 0,
    pageSize = 10
  }: {
    search?: string;
    pageNo?: number;
    pageSize?: number;
  }) {
    try {
      const response = await axios.get(
        `${courseServiceApiUrl}${API.COURSE.QUESTION_BANK_CATEGORY.DEFAULT}`,
        {
          params: {
            search,
            pageNo,
            pageSize
          }
        }
      );
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch question bank categories", error);
      return Promise.reject({
        code: error.response?.data?.code || 503,
        status: error.response?.data?.status || "Service Unavailable",
        message: error.response?.data?.message || error.message
      });
    }
  }
  static async getQuestionBankCategoryById(questionBankCategoryId: string) {
    try {
      const response = await axios.get(
        `${courseServiceApiUrl}${API.COURSE.QUESTION_BANK_CATEGORY.GET_BY_ID.replace(":id", questionBankCategoryId)}`
      );
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    } catch (error: any) {
      console.error("Failed to fetch question bank category by id", error);
      return Promise.reject({
        code: error.response?.data?.code || 503,
        status: error.response?.data?.status || "Service Unavailable",
        message: error.response?.data?.message || error.message
      });
    }
  }

  static async deleteQuestionBankCategory(questionBankCategoryId: string) {
    try {
      const response = await axios.delete(
        `${courseServiceApiUrl}${API.COURSE.QUESTION_BANK_CATEGORY.DELETE_BY_ID.replace(":id", questionBankCategoryId)}`
      );
      if (response.status === 204) {
        return Promise.resolve();
      }
    } catch (error: any) {
      console.error("Failed to delete question bank category", error);
      return Promise.reject({
        code: error.response?.data?.code || 503,
        status: error.response?.data?.status || "Service Unavailable",
        message: error.response?.data?.message || error.message
      });
    }
  }
  static async createQuestionBankCategory({
    name,
    description,
    createdBy
  }: {
    name: string;
    description: string;
    createdBy: string;
  }) {
    try {
      const response = await axios.post(
        `${courseServiceApiUrl}${API.COURSE.QUESTION_BANK_CATEGORY.CREATE}`,
        {
          name,
          description,
          createdBy
        }
      );
      if (response.status === 201) {
        return Promise.resolve(response.data);
      }
    } catch (error: any) {
      console.error("Failed to create question bank category", error);
      return Promise.reject({
        code: error.response?.data?.code || 503,
        status: error.response?.data?.status || "Service Unavailable",
        message: error.response?.data?.message || error.message
      });
    }
  }
  static async updateQuestionBankCategory({
    id,
    name,
    description
  }: {
    id: string;
    name: string;
    description: string;
  }) {
    try {
      const response = await axios.put(
        `${courseServiceApiUrl}${API.COURSE.QUESTION_BANK_CATEGORY.UPDATE_BY_ID.replace(":id", id)}`,
        {
          name,
          description
        }
      );
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    } catch (error: any) {
      console.error("Failed to update question bank category", error);
      return Promise.reject({
        code: error.response?.data?.code || 503,
        status: error.response?.data?.status || "Service Unavailable",
        message: error.response?.data?.message || error.message
      });
    }
  }
}
