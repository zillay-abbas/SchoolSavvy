const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class User {
  static async addUser(name, email, password, status, isRemoved, role) {
    return await prisma.user.create({
      data: {
        user_name: name,
        user_email: email,
        user_passward: password,
        user_status: status,
        user_is_removed: isRemoved,
        user_role: role,
      },
    });
  }

  static async getUserbyEmail(email) {
    return await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });
  }

  static async getUserbyID(id) {
    return await prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });
  }
}

class Admin {
  static async addVerification(userID, isVerified, verifyCode) {
    return await prisma.user_verification.create({
      data: {
        user_id: userID,
        is_verified: isVerified,
        verifiction_code: verifyCode,
      },
    });
  }

  static async updateVerification(userID, isVerified) {
    return await prisma.user_verification.update({
      where: {
        user_id: userID,
      },
      data: {
        is_verified: isVerified,
      },
    });
  }

  static async getAdminbyToken(token) {
    return await prisma.user_verification.findUnique({
      where: {
        verifiction_code: token,
      },
    });
  }

  static async checkVerification(userID) {
    return await prisma.user_verification.findUnique({
      where: {
        user_id: userID,
      }
    })
  }

  static async addSubscription(userID, nowDate, endDate) {
    return await prisma.user_subscription.create({
      data: {
        sb_user_id: userID,
        sb_plan_id: 1,
        sb_start_time: nowDate,
        sb_end_time: endDate,
      }
    });
  }

  static async getSubscription(userID) {
    return await prisma.user_subscription.findMany({
      where: {
        sb_user_id: userID,
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
        student_school_id: schoolID,
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

  static async getPresentStudents(schoolID) {
    return await prisma.school_attendence.findMany({
      where: {
        att_date : { equals: new Date() },
        att_school_id : schoolID,
        att_status: true
      },
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

module.exports = { Admin, Student, Teacher, Parent, User };
