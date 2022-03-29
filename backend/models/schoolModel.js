const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

class School {
  static async createSchool(name, desc, email, status, userID) {
    return await prisma.user_school.create({
      data: {
        school_name: name,
        school_desc: desc,
        school_email: email,
        school_status: status,
        school_is_removed: 0,
        school_user_id: userID,
      },
    });
  }

  static async removeSchool(schoolID) {
    return await prisma.user_school.update({
      where: {
        school_id: schoolID,
      },
      data: {
        school_is_removed: 1,
      },
    });
  }

  static async updateSchool(schoolID, name, desc, email) {
    return await prisma.user_school.update({
      where: {
        school_id: schoolID,
      },
      data: {
        school_name: name,
        school_desc: desc,
        school_email: email,
      },
    });
  }

  static async getActiveSchoolbyUserID(id) {
    return await prisma.admin_user.findUnique({
      where: {
        admin_user_id: id
      },
      select: {
        admin_school_id: true,
      }
    });
  }

  static async addActiveSchool(schID, userID) {
    return await prisma.admin_user.create({
      data: {
        admin_school_id: schID,
        admin_user_id: userID,
      },
    })
  }

  static async setActiveSchool( userID, schoolID) {
    return await prisma.admin_user.update({
      where:{
        admin_user_id: userID,
      },
      data: {
        admin_school_id: schoolID,
      },
    })
  }

  static async getSchoolbyUserID(id) {
    return await prisma.user_school.findFirst({
      where: {
        school_user_id: id,
        school_is_removed: 0,
      },
    });
  }

  static async getSchoolsbyUserID(id) {
    return await prisma.user_school.findMany({
      where: {
        school_user_id: id,
        school_is_removed: 0,
      },
    });
  }

  static async getSchoolbySchoolID(id) {
    return await prisma.user_school.findMany({
      where: {
        school_id: id,
        school_is_removed: 0,
      },
    });
  }
}

module.exports = { School };
