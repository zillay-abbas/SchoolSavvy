const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

class Exam {
  static async addExam(name, start, schId) {
    return await prisma.school_exam.create({
      data: {
        exam_name: name,
        exam_start_date: start,
        exam_school_id: schId,
      },
    });
  }

  static async removeExam(id) {
    return await prisma.school_exam.delete({
      where: {
        exam_id: id,
      },
    });
  }

  static async updateExam(id, name, date) {
    return await prisma.school_exam.update({
      where: {
        exam_id: id,
      },
      data: {
        exam_name: name,
        exam_start_date: date,
      },
    });
  }

  static async getAllExams(schId) {
    return await prisma.school_exam.findMany({
      where: {
        exam_school_id: schId,
      },
      select: {
        exam_id: true,
        exam_name: true,
        exam_start_date: true,
        exam_schedule: {
          select: {
            id: true,
            school_class_room: true,
            class_section: true,
            school_course: true,
            school_teacher: {
              select: {
                teacher_id: true,
                teacher_phone: true,
                user: true,
              },
            },
            date: true,
            start_time: true,
            end_time: true,
            file_name: true,
            file_path: true,
            marks: true,
            exam_submission: {
              select: {
                id: true,
                submit_time: true,
                marks: true,
                file: true,
                file_name: true,
                school_student: {
                  select: {
                    student_id: true,
                    student_reg_no: true,
                    user: true,
                  }
                }
              }
            },
          },
        },
      },
    });
  }

  static async getTeacherExams(teacherId) {
    return await prisma.exam_schedule.findMany({
      where: {
        teacher: teacherId,
      },
      select: {
        id: true,
        school_exam: true,
        school_class_room: true,
        class_section: true,
        school_course: true,
        date: true,
        start_time: true,
        end_time: true,
        file_name: true,
        file_path: true,
        marks: true,
        exam_submission: {
          select: {
            id: true,
            submit_time: true,
            marks: true,
            file: true,
            file_name: true,
            school_student: {
              select: {
                student_id: true,
                student_reg_no: true,
                user: true,
              }
            }
          }
        },
      },
    });
  }

  static async getParentExams(stdId) {
    return await prisma.exam_submission.findMany({
      where: {
        student: stdId,
      },
      select: {
       id: true,
       school_student: {
         select: {
           student_id: true,
           student_reg_no: true,
           user: true,
         }
       },
       exam_schedule_exam_scheduleToexam_submission: {
         select: {
           id: true,
           school_exam: true,
           school_course: true,
           school_class_room: true,
           class_section: true,
           school_teacher: {
             select: {
               user: true,
             }
           },
           date: true,
           marks: true,

         }
       },
       marks: true,
      }
    });
  }

  static async getStudentExams(gradeId, secId, stdId) {
    return await prisma.exam_schedule.findMany({
      where: {
        grade: gradeId,
        section: secId,
      },
      select: {
        id: true,
        school_exam: true,
        school_class_room: true,
        class_section: true,
        school_course: true,
        school_teacher: {
          select: {
            user: true,
          },
        },
        date: true,
        start_time: true,
        end_time: true,
        file_name: true,
        file_path: true,
        marks: true,
        exam_submission: {
          where: {
            student: stdId,
          },
        },
      },
    });
  }

  static async getExambyId(id) {
    return await prisma.exam_schedule.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        school_exam: true,
        school_class_room: true,
        class_section: true,
        school_course: true,
        date: true,
        start_time: true,
        end_time: true,
        file_name: true,
        file_path: true,
        marks: true,
        exam_submission: {
          select: {
            id: true,
            submit_time: true,
            marks: true,
            file: true,
            file_name: true,
            school_student: {
              select: {
                student_id: true,
                student_reg_no: true,
                user: true,
              }
            }
          }
        },
      },
    });
  }

  static async addTotalMarks(examId, marks) {
    return await prisma.exam_schedule.update({
      where: {
        id: examId,
      },
      data: {
        marks: marks,
      },
    });
  }

  static async assignMarks(examId, marks) {
    return await prisma.exam_submission.update({
      where: {
        id: examId,
      },
      data: {
        marks: marks,
      },
    });
  }

  static async addQuestionFile(examId, fileName, filePath) {
    return await prisma.exam_schedule.update({
      where: {
        id: examId,
      },
      data: {
        file_name: fileName,
        file_path: filePath,
      },
    });
  }

  static async addSubmission(stdId, schId, time, filePath, fileName) {
    return await prisma.exam_submission.create({
      data: {
        student: stdId,
        exam_schedule: schId,
        submit_time: time,
        file: filePath,
        file_name: fileName,
      },
    });
  }

  static async getStudentSubmittedExam(id, stdId) {
    return await prisma.exam_schedule.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        school_exam: true,
        school_class_room: true,
        class_section: true,
        school_course: true,
        school_teacher: {
          select: {
            user: true,
          },
        },
        date: true,
        start_time: true,
        end_time: true,
        file_name: true,
        file_path: true,
        marks: true,
        exam_submission: {
          where: {
            student: stdId,
          },
        },
      },
    });
  }
}

class Schedule {
  static async addSchedule(
    examId,
    classId,
    secId,
    teacherId,
    courseId,
    day,
    timeStart,
    timeEnd
  ) {
    return await prisma.exam_schedule.create({
      data: {
        exam: examId,
        grade: classId,
        section: secId,
        course: courseId,
        teacher: teacherId,
        date: day,
        start_time: timeStart,
        end_time: timeEnd,
      },
    });
  }

  static async getExamSchedulebyId(id) {
    return await prisma.school_exam.findUnique({
      where: {
        exam_id: id,
      },
      select: {
        exam_id: true,
        exam_name: true,
        exam_start_date: true,
        exam_schedule: {
          select: {
            id: true,
            school_class_room: true,
            class_section: true,
            school_course: true,
            school_teacher: {
              select: {
                teacher_id: true,
                teacher_phone: true,
                user: true,
              },
            },

            date: true,
            start_time: true,
            end_time: true,
            file_name: true,
            file_path: true,
            marks: true,
          },
        },
      },
    });
  }

  static async getExistingSchedule(classId, secId, subject, examID) {
    return await prisma.exam_schedule.findMany({
      where: {
        exam: examID,
        grade: classId,
        section: secId,
        course: subject,
      },
    });
  }

  static async getSchedule(id) {
    return await prisma.school_exam.findMany({
      where: {
        exam_school_id: id,
      },
      select: {
        exam_id: true,
        exam_name: true,
        exam_start_date: true,
        exam_schedule: {
          select: {
            id: true,
            school_class_room: true,
            school_course: true,
            class_section: true,
            school_teacher: {
              select: {
                teacher_id: true,
                teacher_phone: true,
                user: true,
              },
            },
            date: true,
            start_time: true,
            end_time: true,
            file_name: true,
            file_path: true,
            marks: true,
          },
        },
      },
    });
  }

  static async getAllSchedule(scId) {
    return await prisma.school_timetable.findMany();
  }

  static async updateSchedule(
    id,
    grade,
    secId,
    course,
    teacher,
    date,
    timeStart,
    timeEnd
  ) {
    return await prisma.exam_schedule.update({
      where: {
        id: id,
      },
      data: {
        grade: grade,
        section: secId,
        course: course,
        teacher: teacher,
        date: date,
        start_time: timeStart,
        end_time: timeEnd,
      },
    });
  }

  static async removeSchedule(id) {
    return await prisma.exam_schedule.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = { Exam, Schedule };
