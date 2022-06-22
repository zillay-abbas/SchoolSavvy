const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

class Subject {
  static async addSubject(name, desc, classId, schoolId) {
    return await prisma.school_course.create({
      data: {
        course_name: name,
        course_desription: desc,
        class_id: classId,
        course_school_id: schoolId,
      },
    });
  }

  static async updateSubject(subjId, name, desc, classId, schoolId) {
    return await prisma.school_course.update({
      where: {
        course_id: subjId,
      },
      data: {
        course_name: name,
        course_desription: desc,
        class_id: classId,
        course_school_id: schoolId,
      },
    });
  }

  static async removeSubject(subjId) {
    return await prisma.school_course.delete({
      where: {
        course_id: subjId,
      }
    });
  }

  static async getSubjectsbySchoolID(schoolID) {
    return await prisma.school_course.findMany({
      where: {
        course_school_id: schoolID,
      },
      select: {
        course_id: true,
        course_name: true,
        course_desription: true,
        school_class_room: true,
      }
    });
  }

  static async getSubjectDetail(subId) {
    return await prisma.school_course.findUnique({
      where: {
        course_id: subId,
      },
      select: {
        course_id: true,
        course_name: true,
        course_desription: true,
        school_class_room: true,
      }
    });
  }

  static async delCourse(id) {
    return await prisma.course.delete({
      where: {
        course_id: id,
      },
    });
  }

  static async getCourse(id) {
    return await prisma.course.findUnique({
      where: {
        course_id: id,
      },
    });
  }

  static async checkGradeinCourse(id) {
    return await prisma.course.findMany({
      where: {
        grade_id: id,
      },
    });
  }
}

module.exports = { Subject };
