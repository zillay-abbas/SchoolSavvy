const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Teacher {
  static async getAllTeachers() {
    return await prisma.school_teacher.findMany();
  }

  static async addTeacherData(phone, city, desc, schoolId, userId) {
    return await prisma.school_teacher.create({
      data: {
        teacher_phone: phone,
        city,
        description: desc,
        school_id: schoolId,
        user_id: userId,
      },
    });
  }

  static async updateTeacherData(id, phone, city, desc) {
    return await prisma.school_teacher.updateMany({
      where: {
        user_id: id,
      },
      data: {
        teacher_phone: phone,
        city,
        description: desc,
      },
    });
  }

  static async removeTeacherUserbyId(id) {
    return await prisma.user.delete({
      where: {
        user_id: id,
      },
    });
  }

  static async getTeacherbyId(id) {
    return await prisma.school_teacher.findUnique({
      where: {
        teacher_id: id,
      },
    });
  }

  static async getTeacherDetailbyUserId(userId) {
    return await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        user_role: true,
        school_teacher: true,
        school_timetable: true,
      },
    });
  }

  static async getTeacherbyUserId(id) {
    return await prisma.school_teacher.findMany({
      where: {
        user_id: id,
      },
    });
  }

  static async getTeacherbyEmail(email) {
    return await prisma.school_teacher.findUnique({
      where: {
        teacher_email: email,
      },
    });
  }

  static async getTeachersbySchoolId(schId) {
    return await prisma.user.findMany({
      where: {
        user_role: 2,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        user_role: true,
        school_timetable: true,
        school_teacher: {
          where: {
            school_id: schId,
          },
          select: {
            teacher_id: true,
            teacher_phone: true,
            city: true,
            description: true,
            school_id: true,
            school_class_room: true,
          },
        },
      },
    });
  }

  static async getTeachersbySchool(schId) {
    return await prisma.school_teacher.findMany({
      where: {
        school_id: schId,
      },
    });
  }
}

module.exports = { Teacher };
