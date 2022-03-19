const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

class School {

  static async createSchool(name, desc, email, status, isRemoved, userID) {
    return await prisma.user_school.create({
      data: {
        school_name: name,
        school_desc: desc,
        school_email: email,
        school_status: status,
        school_is_removed: isRemoved,
        school_user_id: userID,
      },
    });
  }

  static async getSchoolbyUserID(id) {
    return await prisma.user_school.findFirst({
      where: {
        school_user_id: id,
      },
    });
  }

  static async getSchoolbySchoolID(id) {
    return await prisma.user_school.findUnique({
      where: {
        school_id: id,
      },
    });
  }
}

module.exports = { School };
