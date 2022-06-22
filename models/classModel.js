const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

class ClassGrade {
  static async addPlan(name, price, isActive) {
    return await prisma.plan.create({
      data: {
        plan_name: name,
        plan_price: price,
        plan_is_active: isActive,
      },
    });
  }

  static async addClass(name, desc, year, schId) {
    return await prisma.school_class_room.create({
      data: {
        cl_name: name,
        cl_description: desc,
        cl_batch_year: year,
        cl_school_id: schId,
      },
    });
  }

  static async removeClass(id) {
    return await prisma.school_class_room.delete({
      where: {
        class_id: id,
      },
    });
  }

  static async removeSection(id) {
    return await prisma.class_section.delete({
      where: {
        section_id: id,
      },
    });
  }

  static async updateClass(classId, name, desc, year) {
    return await prisma.school_class_room.update({
      where: {
        class_id: classId,
      },
      data: {
        cl_name: name,
        cl_description: desc,
        cl_batch_year: year,
      },
    });
  }

  static async addClassSection(name, classId) {
    return await prisma.class_section.create({
      data: {
        section_name: name,
        section_class_id: classId,
      },
    });
  }

  static async getClassSection(classId) {
    return await prisma.class_section.findMany({
      where: {
        section_class_id: classId,
      },
    });
  }

  static async getAllClasses(schId) {
    return await prisma.school_class_room.findMany({
      where: {
        cl_school_id: schId,
      },
      include: {
        class_section: true,
      },
    });
  }

  static async getTeacherClasses(Id) {
    return await prisma.school_class_room.findMany({
      where: {
        school_timetable: {
          some: {
            tt_teacher_id: Id,
          },
        },
      },
      include: {
        class_section: {
          select: {
            section_id: true,
            section_name: true,
            section_class_id: true,
            school_student: {
              select: {
                student_id: true,
                student_reg_no: true,
                school_parent: true,
                user: true,
              },
            },
          },
        },
      },
    });
  }

  static async getClassDetailbyId(classId) {
    return await prisma.school_class_room.findUnique({
      where: {
        class_id: classId,
      },
      select: {
        class_id: true,
        cl_name: true,
        cl_description: true,
        cl_batch_year: true,
        cl_school_id: true,
        cl_teacher_id: true,
        class_section: true,
      },
    });
  }

  static async getClassTimeTable(secId) {
    return await prisma.school_timetable.findMany({
      where: {
        tt_section_id: secId,
      },
      select: {
        tt_day: true,
        tt_time_start: true,
        tt_time_end: true,
        tt_class_link: true,
        school_course: true,
        user: true,
      },
    });
  }

  static async getClassSecTimeTable(classId, secId) {
    return await prisma.school_timetable.findMany({
      where: {
        tt_class_id: classId,
        tt_section_id: secId,
      },
      select: {
        timetable_id: true,
        tt_day: true,
        tt_time_start: true,
        tt_time_end: true,
        tt_class_link: true,
        school_course: true,
        user: {
          select: {
            user_id: true,
            user_name: true,
            user_email: true,
            school_teacher: true,
          },
        },
      },
    });
  }

  static async getTeacherTimeTable(teacherId) {
    return await prisma.school_timetable.findMany({
      where: {
        tt_teacher_id: teacherId,
      },
      select: {
        timetable_id: true,
        tt_day: true,
        tt_time_start: true,
        tt_time_end: true,
        tt_class_link: true,
        school_course: true,
        school_class_room: true,
        class_section: true,
        user: true,
      },
    });
  }

  static async getTeacherUpdatedTimeTable(ttId) {
    return await prisma.school_timetable.findUnique({
      where: {
        timetable_id: ttId,
      },
      select: {
        timetable_id: true,
        tt_day: true,
        tt_time_start: true,
        tt_time_end: true,
        tt_class_link: true,
        school_course: true,
        school_class_room: true,
        class_section: true,
        user: true,
      },
    });
  }

  static async getSchoolTimeTable(schId) {
    return await prisma.school_timetable.findMany({
      where: {
        tt_school_id: schId,
      },
      select: {
        timetable_id: true,
        tt_class_id: true,
        tt_day: true,
        tt_time_start: true,
        tt_time_end: true,
        school_course: true,
        school_class_room: true,
        class_section: true,
        user: true,
        tt_class_link: true,
      },
    });
  }

  static async getAllActivePlans() {
    return await prisma.plan.findMany({
      where: {
        plan_is_active: 1,
      },
    });
  }

  static async updatePlan(id, name, price, isActive) {
    return await prisma.plan.update({
      where: {
        plan_id: id,
      },
      data: {
        plan_name: name,
        plan_price: price,
        plan_is_active: isActive,
      },
    });
  }

  static async removePlan(id) {
    return await prisma.plan.delete({
      where: {
        plan_id: id,
      },
    });
  }

  static async getPlanbyID(id) {
    return await prisma.plan.findUnique({
      where: {
        plan_id: id,
      },
    });
  }

  static async getSubscriptionbyUserID(userID) {
    return await prisma.user_subscription.findMany({
      where: {
        sb_user_id: userID,
      },
    });
  }

  static async updateSubscription(userId, planId, endTime) {
    return await prisma.user_subscription.update({
      where: {
        sb_user_id: userId,
      },
      data: {
        sb_plan_id: planId,
        sb_start_time: new Date(),
        sb_end_time: endTime,
      },
    });
  }

  static async addAssignment(
    title,
    subject,
    grade,
    section,
    dueDate,
    marks,
    teacher,
    path,
    filename
  ) {
    return await prisma.assignment.create({
      data: {
        name: title,
        course: parseInt(subject),
        grade: parseInt(grade),
        section: parseInt(section),
        duedate: new Date(dueDate),
        teacher: parseInt(teacher),
        totalmarks: parseInt(marks),
        file: path,
        file_name: filename,
      },
    });
  }

  static async addImg(
    id,
    img,
  ) {
    return await prisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        user_img: img,
      },
    });
  }

  static async addSubmission(assignId, uploadTime, stdId, filePath, fileName) {
    return await prisma.assignment_submission.create({
      data: {
        assignment: assignId,
        uploadingtime: uploadTime,
        student: stdId,
        file: filePath,
        file_name: fileName,
      },
    });
  }

  static async updateSubmission(id, filePath, fileName) {
    return await prisma.assignment_submission.update({
      where: {
        id: id,
      },
      data: {
        file: filePath,
        file_name: fileName,
      },
    });
  }

  static async updateAssignment(
    id,
    title,
    subject,
    grade,
    section,
    dueDate,
    marks,
    teacher,
    path,
    filename
  ) {
    return await prisma.assignment.update({
      where: {
        id: id,
      },
      data: {
        name: title,
        course: parseInt(subject),
        grade: parseInt(grade),
        section: parseInt(section),
        duedate: new Date(dueDate),
        teacher: parseInt(teacher),
        totalmarks: parseInt(marks),
        file: path,
        file_name: filename,
      },
    });
  }

  static async removeAssignment(id) {
    return await prisma.assignment.delete({
      where: {
        id: id,
      },
    });
  }

  static async getAllAssignments(teacherId) {
    return await prisma.assignment.findMany({
      where: {
        teacher: teacherId,
      },
      select: {
        id: true,
        name: true,
        school_course: true,
        school_class_room: true,
        class_section: true,
        duedate: true,
        totalmarks: true,
        file: true,
        file_name: true,
      },
    });
  }

  static async addObtMarks(id, marks) {
    return await prisma.assignment_submission.update({
      where: {
        id: id,
      },
      data: {
        gainmarks: marks,
      },
    });
  }

  // static async getAssignmentbyId(id) {
  //   return await prisma.assignment.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  static async getStudentAssignments(classId, secId, stdId) {
    return await prisma.assignment.findMany({
      where: {
        grade: classId,
        section: secId,
      },
      select: {
        id: true,
        name: true,
        school_course: true,
        school_class_room: true,
        class_section: true,
        duedate: true,
        user: true,
        totalmarks: true,
        file: true,
        file_name: true,
        assignment_submission: {
          where: {
            student: stdId,
          },
        },
      },
    });
  }

  static async getAssignmentbyId(id) {
    return await prisma.assignment.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        school_course: true,
        school_class_room: true,
        class_section: true,
        duedate: true,
        user: true,
        totalmarks: true,
        file: true,
        file_name: true,
      },
    });
  }

  static async getSubmissionbyId(id) {
    return await prisma.assignment_submission.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async getAssignmentSubmission(id, stdId) {
    return await prisma.assignment.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        school_course: true,
        school_class_room: true,
        class_section: true,
        duedate: true,
        user: true,
        totalmarks: true,
        file: true,
        file_name: true,
        assignment_submission: {
          where: {
            student: stdId,
          },
        },
      },
    });
  }

  static async getAssignedStudents(classId, secId) {
    return await prisma.school_student.findMany({
      where: {
        student_class_id: classId,
        student_section_id: secId,
      },
      select: {
        student_id: true,
        student_reg_no: true,
        student_dob: true,
        student_join_date: true,
        student_parent_id: true,
        school_class_room: true,
        class_section: true,
        user: true,
      },
    });
  }

  static async getHandedInStudents(assignmentId) {
    return await prisma.assignment_submission.findMany({
      where: {
        assignment: assignmentId,
      },
      select: {
        id: true,
        uploadingtime: true,
        gainmarks: true,
        file: true,
        file_name: true,
        school_student: {
          select: {
            student_id: true,
            student_reg_no: true,
            student_dob: true,
            student_join_date: true,
            student_status: true,
            school_parent: true,
            user: true,
          },
        },
      },
    });
  }
}

class Schedule {
  static async addSchedule(
    selectedClass,
    section,
    teacher,
    subject,
    day,
    startTime,
    endTime,
    schId
  ) {
    return await prisma.school_timetable.create({
      data: {
        tt_day: day,
        tt_time_end: endTime,
        tt_time_start: startTime,
        tt_class_id: selectedClass,
        tt_section_id: section,
        tt_teacher_id: teacher,
        tt_subject_id: subject,
        tt_school_id: schId,
      },
    });
  }

  static async getSchedulebyClass(classId, secId, schId) {
    return await prisma.school_timetable.findMany({
      where: {
        tt_class_id: classId,
        tt_section_id: secId,
        tt_school_id: schId,
      },
    });
  }

  static async getSchedulebyId(scId) {
    return await prisma.school_timetable.findMany({
      where: {
        timetable_id: scId,
      },
      select: {
        timetable_id: true,
        tt_class_id: true,
        tt_day: true,
        tt_time_start: true,
        tt_time_end: true,
        school_course: true,
        school_class_room: true,
        class_section: true,
        user: true,
        tt_class_link: true,
      },
    });
  }

  static async getAllSchedule(scId) {
    return await prisma.school_timetable.findMany();
  }

  static async updateSchedule(
    ttId,
    selectedClass,
    section,
    teacher,
    subject,
    day,
    startTime,
    endTime
  ) {
    return await prisma.school_timetable.update({
      where: {
        timetable_id: ttId,
      },
      data: {
        tt_class_id: selectedClass,
        tt_section_id: section,
        tt_teacher_id: teacher,
        tt_subject_id: subject,
        tt_day: day,
        tt_time_start: startTime,
        tt_time_end: endTime,
      },
    });
  }

  static async updateScheduleLink(ttId, link) {
    return await prisma.school_timetable.update({
      where: {
        timetable_id: ttId,
      },
      data: {
        tt_class_link: link,
      },
    });
  }

  static async updateScheduleUrl(ttId, url) {
    return await prisma.school_timetable.update({
      where: {
        timetable_id: ttId,
      },
      data: {
        tt_class_link: url,
      },
    });
  }

  static async removeSchedule(id) {
    return await prisma.school_timetable.delete({
      where: {
        timetable_id: id,
      },
    });
  }
}

module.exports = { ClassGrade, Schedule };
