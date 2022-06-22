const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Parent {
  static async getAllParents() {
    return await prisma.school_teacher.findMany();
  }

  static async addParentData(phone, status, schoolId, userId) {
    return await prisma.school_parent.create({
      data: {
       parent_phone: phone,
       parent_status: status,
       school_id: schoolId,
       user_id: userId,
      },
    });
  }

  static async getParentDetailbyUserId(userId) {
    return await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        user_role: true,
        school_parent: {
            select: {
                parent_id: true,
                parent_phone: true,
                school_student: true,
            }
        },
      },
    });
  }

  static async getParentbyUserID(id){
    return await prisma.school_parent.findMany({
      where: {
        user_id: id,
      },
    });
  }

  static async getParentsbySchoolId(schId) {
    return await prisma.user.findMany({
      where: {
        user_role: 3,
      },
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        user_role: true,
        school_parent: {
          where: {
            school_id: schId,
          },
          select: {
            parent_id: true,
            parent_phone: true,
            school_student: true,
          }
        }
      },
    });
  }

  static async updateParentData(id, phone) {
    return await prisma.school_parent.updateMany({
      where: {
        user_id: id,
      },
      data: {
        parent_phone: phone,
      },
    });
  }

}

module.exports = { Parent };
