import axios from "../../axios";
import FileDownload from "js-file-download";

import { classActions } from "../Slice/classSlice";

export const addClass = (name, desc, year) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const schId = getState().dashboard.school.id;
      const { data } = await axios.post(
        "/v1/user/class/add",
        { name, desc, year, schId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(classActions.classCreateSuccess(data));
    } catch (err) {
      dispatch(classActions.classCreateFailure(err));
    }
  };
};

export const updateClass = (classId, name, desc, year) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const schId = getState().dashboard.school.id;
      const { data } = await axios.post(
        "/v1/user/class/update",
        { classId, name, desc, year, schId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(classActions.classUpdateSuccess(data));
    } catch (err) {
      dispatch(classActions.classUpdateFailure(err));
    }
  };
};

export const removeClass = (classId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/v1/user/class/remove",
        { classId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      dispatch(classActions.classRemoveSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(classActions.classRemoveFailure(err));
    }
  };
};

export const removeClassSection = (sectionId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/v1/user/class/removeSection",
        { sectionId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      dispatch(classActions.sectionRemoveSuccess(data));
    } catch (err) {
      dispatch(classActions.sectionRemoveFailure(err));
    }
  };
};

export const addClassSection = (name, classId) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/class/addSection",
        { name, classId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(classActions.sectionCreateSuccess(data));
    } catch (err) {
      dispatch(classActions.sectionCreateFailure(err));
    }
  };
};

export const loadClassSchedule = () => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/class/getSchoolTimeTable", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });

      dispatch(classActions.loadClassRoutineSuccess(data));
    } catch (err) {
      dispatch(classActions.loadClassRoutineFailure(err));
    }
  };
};

export const loadClassSecSchedule = (classId, secId) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/class/getClassSecSchedule",
        { classId, secId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      dispatch(classActions.loadClassRoutineSuccess(data));
    } catch (err) {
      dispatch(classActions.loadClassRoutineFailure(err));
    }
  };
};

export const loadSchoolClasses = () => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/class/getAll", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      dispatch(classActions.loadClassSuccess(data));
    } catch (err) {
      dispatch(classActions.loadClassFailure(err));
    }
  };
};

export const loadTeacherClasses = () => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/class/getTeacherClasses", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      dispatch(classActions.loadClassSuccess(data));
    } catch (err) {
      dispatch(classActions.loadClassFailure(err));
    }
  };
};

export const loadStudentClassTimeTable = (secId) => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/class/getClassTimeTable",
        { secId },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );
      dispatch(classActions.loadClassRoutineSuccess(data));
    } catch (err) {
      dispatch(classActions.loadClassRoutineFailure(err));
    }
  };
};

export const loadTeacherTimeTable = (teacherId) => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/class/getTeacherTimeTable",
        { teacherId },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );
      dispatch(classActions.loadClassRoutineSuccess(data));
    } catch (err) {
      dispatch(classActions.loadClassRoutineFailure(err));
    }
  };
};

export const updateClassTimeTable = (
  ttId,
  selectedClass,
  section,
  teacher,
  subject,
  day,
  startTime,
  endTime
) => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const schId = getstate().dashboard.school.id;

      const { data } = await axios.post(
        "/v1/user/class/updateRoutine",
        {
          ttId,
          selectedClass,
          section,
          teacher,
          subject,
          day,
          startTime,
          endTime,
          schId,
        },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(classActions.updateScheduleSuccess(data));
    } catch (err) {
      console.log(err.response);
      dispatch(classActions.updateScheduleFailure(err));
    }
  };
};

export const addClassTimeTable = (
  selectedClass,
  section,
  teacher,
  subject,
  day,
  startTime,
  endTime
) => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const schId = getstate().dashboard.school.id;

      const { data } = await axios.post(
        "/v1/user/class/addRoutine",
        {
          selectedClass,
          section,
          teacher,
          subject,
          day,
          startTime,
          endTime,
          schId,
        },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );

      dispatch(classActions.createScheduleSuccess(data));
    } catch (err) {
      dispatch(classActions.createScheduleFailure(err));
    }
  };
};

export const removeClassTimeSlot = (ttId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/v1/user/class/removeTimeSlot",
        { ttId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(classActions.timeSlotRemoveSuccess(data));
    } catch (err) {
      dispatch(classActions.timeSlotRemoveFailure(err));
    }
  };
};

export const hideClassErrorMsg = () => {
  return async (dispatch) => {
    dispatch(classActions.hideErrorMsg());
  };
};

export const createClassLink = (topic, duration, slotId) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const schId = getState().dashboard.school.id;

      const { data } = await axios.post(
        "/v1/user/class/createClass",
        { topic, duration, slotId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);

      dispatch(classActions.linkCreateSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(classActions.linkCreateFailure(err));
    }
  };
};

export const addAssignment = (formData) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post("/v1/user/class/assignment", formData, {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });
      dispatch(classActions.assignmentCreateSuccess(data));
    } catch (err) {
      dispatch(classActions.assignmentCreateFailure(err));
    }
  };
};

export const addImg = (formData) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post("/v1/user/class/uploadImg", formData, {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      console.log(data);
      
      dispatch(classActions.imgUpload(data));
    } catch (err) {
      dispatch(classActions.assignmentCreateFailure(err));
    }
  };
};

export const loadAssignments = () => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/class/assignment", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });
      dispatch(classActions.assignmentLoadSuccess(data));
    } catch (err) {
      dispatch(classActions.assignmentLoadFailure(err));
    }
  };
};

export const assignMarks = (id, marks) => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/teacher/addAssignmentMarks",
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

      dispatch(classActions.assignmentUpdateSuccess(data));
    } catch (err) {
      dispatch(classActions.assignmentLoadFailure(err));
    }
  };
};

export const loadStudentAssignments = () => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/class/studentassignment", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      dispatch(classActions.assignmentLoadSuccess(data));
    } catch (err) {
      dispatch(classActions.assignmentLoadFailure(err));
    }
  };
};

export const removeAssignment = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete("/v1/user/class/assignment", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
        data: {
          id,
        },
      });

      dispatch(classActions.assignmentRemoveSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(classActions.assignmentRemoveFailure(err));
    }
  };
};

export const updateAssignment = (formData) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.put("/v1/user/class/assignment", formData, {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      dispatch(classActions.assignmentUpdateSuccess(data));
    } catch (err) {
      dispatch(classActions.assignmentUpdateFailure(err));
    }
  };
};

export const downloadAssignmentFile = (path, fileName) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get("/v1/user/class/getAssignmentFile", {
        params: { path: path },
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
        responseType: "blob",
      });

      FileDownload(data, fileName);
    } catch (err) {
      console.log(err);
      dispatch(classActions.assignmentLoadFailure(err));
    }
  };
};

export const addSolutionFile = (formData) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/class/uploadSolution",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(classActions.assignmentUpdateSuccess(data));
    } catch (err) {
      dispatch(classActions.assignmentLoadFailure(err));
    }
  };
};

export const updateAssignmentSubmission = (formData) => {
  return async (dispatch, getState) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/class/updateSubmission",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(classActions.assignmentUpdateSuccess(data));
    } catch (err) {
      dispatch(classActions.assignmentLoadFailure(err));
    }
  };
};
