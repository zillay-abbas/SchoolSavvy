const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Student {
  static async addStudentData(
    regNo,
    stdId,
    dob,
    joinDate,
    classId,
    sectionId,
    schoolId
  ) {
    return await prisma.school_student.create({
      data: {
        student_reg_no: regNo,
        student_dob: dob,
        student_join_date: joinDate,
        student_class_id: classId,
        school_id: schoolId,
        student_section_id: sectionId,
        user_id: stdId,
      },
    });
  }

  static async addStudentParent(stdId, parentId) {
    return await prisma.school_student.update({
      where: {
        student_id: stdId,
      },
      data: {
        student_parent_id: parentId,
      },
    });
  }

  static async updateStudentData(id, regNo, dob, classId, sectionId) {
    return await prisma.school_student.update({
      where: {
        student_id: id,
      },
      data: {
        student_reg_no: regNo,
        student_dob: dob,
        student_class_id: classId,
        student_section_id: sectionId,
      },
    });
  }

  static async getStudentbyRegNo(id) {
    return await prisma.school_student.findUnique({
      where: {
        student_reg_no: id,
      },
    });
  }

  static async getStudentDetailbyUserId(userId) {
    return await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        user_role: true,
        school_student: {
          select: {
            student_id: true,
            student_reg_no: true,
            student_dob: true,
            student_join_date: true,
            student_parent_id: true,
            school_id: true,
            school_class_room: {
              select: {
                class_id: true,
                cl_name: true,
                cl_description: true,
                cl_batch_year: true,
                cl_teacher_id: true,
              },
            },
            class_section: {
              select: {
                section_id: true,
                section_name: true,
              },
            },
          },
        },
      },
    });
  }

  static async getStdDetailbyParentId(parentId) {
    return await prisma.school_student.findMany({
      where: {
        student_parent_id: parentId,
      },
      select: {
        student_id: true,
        student_reg_no: true,
        student_dob: true,
        student_join_date: true,
        school_class_room: true,
        class_section: true,
        user: true,
      },
    });
  }

  static async getStudentbyId(id) {
    return await prisma.school_student.findUnique({
      where: {
        student_id: id,
      },
    });
  }

  static async getStudentbyUserId(userId) {
    return await prisma.school_student.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  static async removeStudentUserbyId(id) {
    return await prisma.user.delete({
      where: {
        user_id: id,
      },
    });
  }

  static async getAllStudentsbySchoolId(schId) {
    return await prisma.user.findMany({
      where: {
        user_role: 1,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        user_role: true,
        school_student: {
          where: {
            school_id: schId,
          },
          select: {
            student_id: true,
            student_reg_no: true,
            student_dob: true,
            student_join_date: true,
            student_parent_id: true,
            school_id: true,
            school_class_room: {
              select: {
                class_id: true,
                cl_name: true,
                cl_description: true,
                cl_batch_year: true,
                cl_teacher_id: true,
              },
            },
            class_section: {
              select: {
                section_id: true,
                section_name: true,
              },
            },
          },
        },
      },
      // include: {
      //   school_student: {
      //     where: {
      //       student_school_id: schId,
      //     }
      //   }
      // }
    });
  }

  static async getStudentbyEmail(email) {
    return await prisma.school_student.findUnique({
      where: {
        student_email: email,
      },
    });
  }

  static async getStudentsbySchool(schoolID) {
    return await prisma.school_student.findMany({
      where: {
        student_school_id: schoolID,
      },
    });
  }

  static async getTodayStudents(schoolID, today) {
    return await prisma.attendance.findMany({
      where: {
        date: today,
        school: schoolID,
      },
      select: {
        id: true,
        date: true,
        teacher: true,
        school_class_room: true,
        class_section: true,
        school_attendence: {
          select: {
            attendence_id: true,
            att_remarks: true,
            school_student: {
              select: {
                student_id: true,
                student_reg_no: true,
                user: true,
              }
            }
          }
        },
      }
    });
  }

  static async getAbsentStudents(schoolID) {
    return await prisma.school_attendence.findMany({
      where: {
        att_status: false,
        att_date: { equals: new Date() },
        att_school_id: schoolID,
      },
    });
  }
}

module.exports = { Student };
