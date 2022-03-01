const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient({
  rejectOnNotFound: false,
});

class Plan {
  static async addPlan(name, price, isActive) {
    return await prisma.plan.create({
      data: {
        plan_name: name,
        plan_price: price,
        plan_is_active: isActive,
      },
    });
  }

  static async getAllPlans() {
    return await prisma.plan.findMany();
  }
  
  static async getAllActivePlans() {
    return await prisma.plan.findMany({
      where: {
        plan_is_active: 1,
      },
    });
  }

  static async updatePlan(id, name, price, isActive) {
    return await prisma.plan.update({
      where: {
        plan_id: id,
      },
      data: {
        plan_name: name,
        plan_price: price,
        plan_is_active: isActive,
      },
    });
  }

  static async removePlan(id) {
    return await prisma.plan.delete({
      where: {
        plan_id: id,
      },
    });
  }
}

module.exports = { Plan };
