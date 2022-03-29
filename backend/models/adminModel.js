<<<<<<< HEAD:backend/models/adminModel.js
const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient({
  rejectOnNotFound: false,
});
=======
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c:backend/models/userModel.js

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

<<<<<<< HEAD:backend/models/adminModel.js
  static async getAdminbyToken(token) {
    return await prisma.user.findUnique({
      where: {
        user_verification: token
=======
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
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c:backend/models/userModel.js
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
<<<<<<< HEAD:backend/models/adminModel.js
        user_status: status,
=======
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
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c:backend/models/userModel.js
      }
    })
  }

<<<<<<< HEAD:backend/models/adminModel.js
  static async getAdminbyEmail(email) {
    return await prisma.user.findUnique({
      where: {
        user_email: email,
=======
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
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c:backend/models/userModel.js
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

<<<<<<< HEAD:backend/models/adminModel.js
=======
  static async getStudentsbySchool(schoolID) {
    return await prisma.school_student.findMany({
      where: {
        student_school_id: schoolID,
      },
    });
  }

>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c:backend/models/userModel.js
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

module.exports = { Admin, Student, Teacher, Parent, User };
