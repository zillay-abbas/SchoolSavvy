import axios from "../../axios";

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
      const { data } = await axios.get("/v1/user/class/getAll", {
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

export const loadSchoolClasses = () => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/class/getAll", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      console.log(data);
      dispatch(classActions.loadClassSuccess(data));
    } catch (err) {
      dispatch(classActions.loadClassFailure(err));
    }
  };
};

export const loadClassTimeTable = (secId) => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {
      const { data } = await axios.post("/v1/user/class/getRoutine",
        { secId },
        {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      console.log(data);
      dispatch(classActions.loadClassRoutineSuccess(data));
    } catch (err) {
      dispatch(classActions.loadClassRoutineFailure(err));
    }
  };
}

export const addClassTimeTable = (selectedClass, section, teacher, subject, day, startTime, endTime) => {
  return async (dispatch, getstate) => {
    dispatch(classActions.loadingRequest());

    try {

      const schId = getstate().dashboard.school.id;

      const { data } = await axios.post("/v1/user/class/addRoutine",
        { selectedClass, section, teacher, subject, day, startTime, endTime, schId },
        {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      console.log(data);
      dispatch(classActions.loadClassRoutineSuccess(data));
    } catch (err) {
      dispatch(classActions.loadClassRoutineFailure(err));
    }
  };
}

export const hideClassErrorMsg = () => {
  return async (dispatch) => {
    dispatch(classActions.hideErrorMsg());
  };
};
