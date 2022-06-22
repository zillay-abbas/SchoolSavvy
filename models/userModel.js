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

  static async updateUser(id, name, email, password, status, isRemoved) {
    return await prisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        user_name: name,
        user_email: email,
        user_passward: password,
        user_status: status,
        user_is_removed: isRemoved,
      }
    })
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

  static async removeUserbyId(id) {
    return await prisma.user.delete({
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

  static async getParentbyUserID(id) {
    return await prisma.school_parent.findMany({
      where: {
        user_id: id,
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

module.exports = { Admin, Parent, User };
