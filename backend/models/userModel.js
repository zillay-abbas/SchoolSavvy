const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

class Admin {
  static async addUser(name, email, password) {
    // Check if posts should be included in the query
    const user = {
      name: name,
      email: email,
      passward: password,
    };
    // Pass 'user' object into query
    return await prisma.users.create({ data: user });
  }

  static async getUser(email) {
    return await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
  }
}

class Student {
  static async getStudents() {
    return await prisma.student.findMany();
  }

  static async getStudent(id) {
    return await prisma.student.findUnique({
      where: {
        student_id: id,
      }
    });
  }

  static async addStudent(student) {
    const { name, dob, phone, join_date, email, hashPassword, class_id, parent_id } = student;

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
        class_id: parseInt(class_id) 
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
}

class Parent {
  static async getParents() {
    return await prisma.parent.findMany();
  }
}

module.exports = { Admin, Student, Teacher, Parent };
