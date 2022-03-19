const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

class Admin {
  static async addUser(name, email, password, status, isRemoved, configToken) {
    return await prisma.user.create({
      data: {
        user_name: name,
        user_email: email,
        user_passward: password,
        user_status: status,
        user_is_removed: isRemoved,
        user_verification: configToken,
      },
    });
  }

  static async getAdminbyToken(token) {
    return await prisma.user.findUnique({
      where: {
        user_verification: token,
      },
    });
  }

  static async getAdminbyEmail(email) {
    return await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });
  }

  static async getAdminbyID (id) {
    return await prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });
  }

  static async updateUserVerification(id, status) {
    return await prisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        user_status: status,
      },
    });
  }
}

class Student {
  static async getAllStudents() {
    return await prisma.school_student.findMany();
  }

  static async getStudentbyId(id) {
    return await prisma.school_student.findUnique({
      where: {
        student_id: id,
      },
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
        student_school_id: schoolID
      }
    });
  }

  static async addStudent(student) {
    const {
      name,
      dob,
      phone,
      join_date,
      email,
      hashPassword,
      class_id,
      parent_id,
    } = student;

    // Pass 'user' object into query
    return await prisma.student.create({
      data: {
        name,
        dob: new Date(dob),
        phone,
        join_date: new Date(join_date),
        email,
        password: hashPassword,
        parent_id: parseInt(parent_id),
        class_id: parseInt(class_id),
      },
    });
  }

  static async getPresentStudents() {
    return await prisma.attendence.findMany({
      where: {
        // status: true,
        date: { equals: new Date() },
      },
    });
  }

  static async getAbsentStudents() {
    return await prisma.attendence.findMany({
      where: {
        // status: false,
        date: { equals: new Date() },
      },
    });
  }
}

class Teacher {
  static async getAllTeachers() {
    return await prisma.school_teacher.findMany();
  }

  static async addTeacher(teacher) {
    const { name, dob, phone, email, hashPassword } = teacher;

    // Pass 'user' object into query
    return await prisma.teacher.create({
      data: {
        name,
        dob: new Date(dob),
        phone,
        email,
        password: hashPassword,
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

  static async getTeacherbyEmail(email) {
    return await prisma.school_teacher.findUnique({
      where: {
        teacher_email: email,
      },
    });
  }

  static async getTeachersbySchool(schoolID) {
    return await prisma.school_teacher.findMany({
      where: {
        teacher_school_id: schoolID,
      },
    });
  }
}

class Parent {
  static async getAllParents() {
    return await prisma.school_parent.findMany();
  }

  static async getParentbyEmail(email) {
    return await prisma.school_parent.findUnique({
      where: {
        parent_email: email,
      },
    });
  }

  static async getParentbyID(id) {
    return await prisma.school_parent.findUnique({
      where: {
        parent_id: id,
      },
    });
  }

  static async getParentsbySchool(schoolID) {
    return await prisma.school_parent.findMany({
      where: {
        parent_school_id: schoolID,
      },
    });
  }
}

module.exports = { Admin, Student, Teacher, Parent };
