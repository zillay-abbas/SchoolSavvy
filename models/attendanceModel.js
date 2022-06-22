const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Attendance {
  static async addAttendance(date, teacherId, gradeId, secId, schId) {
    return await prisma.attendance.create({
      data: {
        date: date,
        teacher: teacherId,
        grade: gradeId,
        section: secId,
        school: schId,
      },
    });
  }

  static async submitAttendance(remarks, stdId, att) {
    return await prisma.school_attendence.create({
      data: {
        att_remarks: remarks,
        att_student_id: stdId,
        attendence: att,
      },
    });
  }

  static async updateAttendance(id, remarks) {
    return await prisma.school_attendence.update({
      where: {
        attendence_id: id,
      },
      data: {
        att_remarks: remarks,
      },
    });
  }

  static async checkMarked(date, grade, sec) {
    return await prisma.attendance.findMany({
      where: {
        date: date,
        grade: grade,
        section: sec,
      },
    });
  }

  static async getAttendance(id) {
    return await prisma.attendance.findUnique({
      where: {
        id: id,
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
              },
            },
          },
        },
      },
    });
  }

  static async getTeacherAttendance(teacherId) {
    return await prisma.attendance.findMany({
      where: {
        teacher: teacherId,
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
              },
            },
          },
        },
      },
    });
  }

  static async getSchoolAttendance(schId) {
    return await prisma.attendance.findMany({
      where: {
        school: schId,
      },
      select: {
        id: true,
        date: true,
        school_teacher: {
          select: {
            user: true,
          },
        },
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
              },
            },
          },
        },
      },
    });
  }

  static async getStudentAttendance(stdId, classId, secId) {
    return await prisma.attendance.findMany({
      where: {
        grade: classId,
        section: secId,
      },
      select: {
        id: true,
        date: true,
        teacher: true,
        grade: true,
        section: true,
        school_attendence: {
          where: {
            att_student_id: stdId,
          },
          select: {
            attendence_id: true,
            att_remarks: true,
          },
        },
      },
    });
  }
}

module.exports = { Attendance };
