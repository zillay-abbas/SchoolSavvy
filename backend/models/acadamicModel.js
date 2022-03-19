const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

class Subject {
  static async addCourse(name, description, grade_id) {
    await prisma.course.create({
      data: {
        name: name,
        c_desription: description,
        grade_id: grade_id,
      },
    });
  }

  static async getSubjectsbySchoolID(schoolID) {
    return await prisma.school_course.findMany({
      where: {
        course_school_id: schoolID,
      },
    });
  }

  static async getSubjects() {
    return await prisma.course.findMany();
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

class Grade {
  static async addGrade(name, descripton) {
    return await prisma.grade.create({
      data: {
        name: name,
        descripton: descripton,
      },
    });
  }

  static async checkGrade(id) {
    return await prisma.grade.findUnique({
      where: {
        grade_id: id,
      },
    });
  }

  static async delGrade(id) {
    return await prisma.grade.delete({
      where: {
        grade_id: id,
      },
    });
  }
}

class Batch {
  static async checkGradeinBatch(id) {
    return await prisma.renamedclass.findMany({
      where: {
        grade_id: id,
      },
    });
  }
}

module.exports = { Subject, Grade, Batch };
