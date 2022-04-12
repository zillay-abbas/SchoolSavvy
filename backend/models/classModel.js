const PrismaClient = require("@prisma/client");
const prisma = new PrismaClient.PrismaClient();

class ClassGrade {
  static async addPlan(name, price, isActive) {
    return await prisma.plan.create({
      data: {
        plan_name: name,
        plan_price: price,
        plan_is_active: isActive,
      },
    });
  }

  static async addClass(name, desc, year, schId) {
    return await prisma.school_class_room.create({
      data: {
        cl_name: name,
        cl_description: desc,
        cl_batch_year: year,
        cl_school_id: schId
      },
    });
  }

  static async removeClass(id) {
    return  await prisma.school_class_room.delete({
      where: {
        class_id: id,
      },
    });
  }

  static async removeSection(id) {
    return  await prisma.class_section.delete({
      where: {
        section_id: id,
      },
    });
  }

  static async updateClass(classId, name, desc, year) {
    return await prisma.school_class_room.update({
      where: {
        class_id: classId,
      },
      data: {
        cl_name: name,
        cl_description: desc,
        cl_batch_year: year,
      },
    });
  }

  static async addClassSection(name, classId) {
    return await prisma.class_section.create({
      data: {
        section_name: name,
        section_class_id: classId,
      },
    });
  }

  static async getClassSection(classId) {
    return await prisma.class_section.findMany({
      where: {
        section_class_id: classId,
      }
    });
  }

  static async getAllClasses(schId) {
    return await prisma.school_class_room.findMany({
      where: {
        cl_school_id: schId,
      },
      include: {
        class_section: true,
      }
    });
  }

  static async getClassDetailbyId(classId) {
    return await prisma.school_class_room.findUnique({
      where: {
        class_id: classId
      },
      select: {
        class_id: true,
        cl_name: true,
        cl_description: true,
        cl_batch_year: true,
        cl_school_id: true,
        cl_teacher_id: true,
        class_section: true,
      }
    });
  }

  static async getClassTimeTable(secId) {
    return await prisma.school_timetable.findMany({
      where: {
        tt_section_id: secId
      },
      select:{
        tt_day: true,
        tt_time_start: true,
        tt_time_end: true,
        tt_class_link: true,
        school_course: true,
        school_teacher: true,
      }
    });
  }

  static async getSchoolTimeTable(schId) {
    return await prisma.school_timetable.findMany({
      where: {
        tt_school_id: schId,
      },
      select:{
        tt_day: true,
        tt_time_start: true,
        tt_time_end: true,
        tt_class_link: true,
        school_course: true,
        school_teacher: true,
      }
    });
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

  static async getPlanbyID(id) {
    return await prisma.plan.findUnique({
      where: {
        plan_id: id,
      }
    })
  }

  static async getSubscriptionbyUserID(userID) {
    return await prisma.user_subscription.findMany({
      where: {
        sb_user_id: userID,
      }
    })
  }

  static async updateSubscription(userId, planId, endTime) {
    return await prisma.user_subscription.update({
      where:{
        sb_user_id: userId,
      },
      data: {
        sb_plan_id: planId,
        sb_start_time: new Date(),
        sb_end_time: endTime,
      }
    })
  }

}

class Schedule {
  static async addSchedule(selectedClass, section, teacher, subject, day, startTime, endTime, schId) {
    return await prisma.school_timetable.create({
      data: {
        tt_day: day,
        tt_time_end: endTime,
        tt_time_start: startTime,
        tt_class_id: selectedClass,
        tt_section_id: section,
        tt_teacher_id: teacher,
        tt_subject_id: subject,
        tt_school_id: schId,
      }
    })
  }

  static async getSchedulebyClass(classId, secId, schId) {
    return await prisma.school_timetable.findMany({
      where: {
        tt_class_id: classId,
        tt_section_id: secId,
        tt_school_id: schId,
      }
    })
  }

  static async updateSchedule(id, name, price, isActive) {}

  static async removeSchedule(id) {}
}

module.exports = { ClassGrade, Schedule };
