const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient({
  rejectOnNotFound: false,
});

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
        user_verification: token
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
      }
    })
  }

  static async getAdminbyEmail(email) {
    return await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });
  }
}

class Student {
  static async getStudents() {
    return await prisma.student.findMany();
  }

  static async getStudentbyId(id) {
    return await prisma.student.findUnique({
      where: {
        student_id: id,
      },
    });
  }

  static async checkStudentEmail(email) {
    return await prisma.student.findMany({
      where: {
        email,
      },
    });
  }

  static async getStudentbyEmail(email) {
    return await prisma.school_student.findUnique({
      where: {
        student_email: email
      },
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
  static async getTeachers() {
    return await prisma.teacher.findMany();
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
    return await prisma.teacher.findUnique({
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
}

class Parent {
  static async getParents() {
    return await prisma.parent.findMany();
  }

  static async getParentbyEmail(email) {
    return await prisma.school_parent.findUnique({
      where: {
        parent_email: email,
      },
    });
  }
}

module.exports = { Admin, Student, Teacher, Parent };