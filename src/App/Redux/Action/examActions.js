import axios from "../../axios";
import FileDownload from 'js-file-download'

import { examActions } from "../Slice/examSlice";

export const addExam = (name, date) => {
  return async (dispatch, getState) => {
    dispatch(examActions.loadingRequest());

    try {
      const schId = getState().dashboard.school.id;

      const { data } = await axios.post(
        "/v1/user/exam/add",
        { name, date, schId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(examActions.examCreateSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const updateExam = (id, name, date) => {
  return async (dispatch, getState) => {
    dispatch(examActions.loadingRequest());

    try {
      const schId = getState().dashboard.school.id;

      const { data } = await axios.post(
        "/v1/user/exam/update",
        { id, name, date },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(examActions.examUpdateSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const removeExam = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/v1/user/exam/remove",
        { id },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      dispatch(examActions.examRemoveSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(examActions.onFailure(err));
    }
  };
};

export const loadExams = () => {
  return async (dispatch, getstate) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/exam/getAll", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      dispatch(examActions.loadExamSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const loadTeacherExams = () => {
  return async (dispatch, getstate) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/exam/getTeacherExams", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      dispatch(examActions.loadExamSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const loadStudentSubmissions = () => {
  return async (dispatch, getstate) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/exam/getSubmissions", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      dispatch(examActions.loadExamSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const loadParentExams = (stdId) => {
  return async (dispatch, getstate) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/exam/getParentExams",
        { stdId },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );

      dispatch(examActions.loadExamSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const loadStudentExams = () => {
  return async (dispatch, getstate) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/exam/getStudentExams", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      dispatch(examActions.loadExamSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const addTotalMarks = (id, marks) => {
  return async (dispatch, getstate) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/exam/addMarks",
        {
          id,
          marks,
        },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );

      dispatch(examActions.examUpdateTotalMarksSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const addObtMarks = (id, marks) => {
  return async (dispatch, getstate) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/exam/addObtMarks",
        {
          id,
          marks,
        },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );

      dispatch(examActions.examUpdateTotalMarksSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const addQuestionFile = (formData) => {
  return async (dispatch, getState) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/exam/addQuestionPaper",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(examActions.examUpdateTotalMarksSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const addAnswerFile = (formData) => {
  return async (dispatch, getState) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/exam/uploadSolution",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(examActions.uploadSolutionSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const downloadFile = (path, fileName) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        "/v1/user/exam/getExamFile",
        {
          params: { path: path },
          headers: { 
            Authorization: `Bearer ${getState().user.token}`,
          },
          responseType: "blob",
        },
      );

      FileDownload(data, fileName);
    } catch (err) {
      console.log(err);
      dispatch(examActions.onFailure(err));
    }
  };
};

export const updateExamSchedule = (
  id,
  grade,
  secId,
  course,
  teacher,
  date,
  startTime,
  endTime
) => {
  return async (dispatch, getstate) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/exam/updateRoutine",
        {
          id,
          grade,
          secId,
          course,
          teacher,
          date,
          startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );
      dispatch(examActions.updateExamScheduleSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const addExamSchedule = (
  examId,
  classId,
  secId,
  teacherId,
  courseId,
  day,
  startTime,
  endTime
) => {
  return async (dispatch, getstate) => {
    dispatch(examActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/exam/addRoutine",
        {
          examId,
          classId,
          secId,
          teacherId,
          courseId,
          day,
          startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );

      dispatch(examActions.createExamScheduleSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const removeExamSchedule = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/v1/user/exam/removeSchedule",
        { id },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      dispatch(examActions.updateExamScheduleSuccess(data));
    } catch (err) {
      dispatch(examActions.onFailure(err));
    }
  };
};

export const hideExamErrorMsg = () => {
  return async (dispatch) => {
    dispatch(examActions.hideErrorMsg());
  };
};
