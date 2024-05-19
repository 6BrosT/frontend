export const API = {
  CORE: {
    CERTIFICATE_COURSE: {
      DEFAULT: "/core/certificate-courses",
      GET_BY_ID: "/core/certificate-courses/:id",
      UPDATE_BY_ID: "/core/certificate-courses/:id",
      DELETE_BY_ID: "/core/certificate-courses/:id",
      REGISTER_BY_ID: "/core/certificate-courses/register"
    },
    TOPIC: {
      DEFAULT: "/core/topics",
      GET_BY_ID: "/core/topics/:id",
      UPDATE_BY_ID: "/core/topics/:id",
      DELETE_BY_ID: "/core/topics/:id"
    },
    CHAPTER: {
      DEFAULT: "/core/chapters",
      GET_BY_ID: "/core/chapters/:id",
      UPDATE_BY_ID: "/core/chapters/:id",
      DELETE_BY_ID: "/core/chapters/:id"
    },
    CONTEST: {
      DEFAULT: "/core/contests",
      GET_BY_ID: "/core/contests/:id",
      UPDATE_BY_ID: "/core/contests/:id",
      DELETE_BY_ID: "/core/contests/:id",
      REGISTER_BY_ID: "/core/contests/:id/register",
      MOST_POPULAR: "/core/contests/popular"
    },
    QUESTION: {
      DEFAULT: "/core/questions",
      GET_BY_ID: "/core/questions/:id",
      UPDATE_BY_ID: "/core/questions/:id",
      DELETE_BY_ID: "/core/questions/:id",
      SHORT_ANSWER_QUESTION: {
        CREATE: "questions/shortanswer-question/create",
        GET_BY_ID: "/core/questions/shortanswer-question/:id",
        GET_ALL: "/core/questions/shortanswer-question"
      },
      ESSAY_QUESTION: {
        CREATE: "questions/essay-question/create",
        GET_BY_ID: "/core/questions/essay-question/:id",
        GET_ALL: "/core/questions/essay-question"
      },
      MULTIPLE_CHOICE_QUESTION: {
        CREATE: "questions/multichoice-question/create",
        GET_BY_ID: "/core/questions/multichoice-question/:id",
        GET_ALL: "/core/questions/multichoice-question"
      },
    }
  },
  CODE_ASSESSMENT: {
    TAG: {
      DEFAULT: "/code-assessment/tag"
    },
    CODE_QUESTION: {
      DEFAULT: "/code-assessment/code-question"
    }
  }
};
