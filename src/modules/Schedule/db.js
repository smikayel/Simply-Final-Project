import { prisma } from '../../services/Prisma.js'

const { schedule } = prisma

export const getScheduleById = async (id) => {
  return schedule.findUnique({
    include: {
      scheduleSubject: true,
    },
    where: {
      id,
    },
  })
}

export const getScheduleByGroupId = async (groupId, day) => {
  try {
    const schedules = await schedule.findMany({
      include: {
        scheduleSubject: {
          include: {
            subject: true,
          },
        },
      },
      where: {
        groupId,
        day,
      },
    })
    return schedules
  } catch (err) {
    throw err.message
  }
}

export const createSchedules = (schedules) => {
  return prisma.$transaction(async (prisma) => {
    const createdSchedules = []
    for (const schedule of schedules) {
      const s = await createSchedule(prisma, schedule)
      createdSchedules.push(s)
    }
    return createdSchedules
  })
}

export const createSchedule = async (prisma, { scheduleSubject, ...data }) => {
  const exists = await prisma.schedule.findUnique({
    where: {
      day_groupId: data,
    },
    include: {
      scheduleSubject: true,
    },
  })
  if (exists) {
    exists.scheduleSubject.forEach((elem, i) => {
      elem.subjectId = scheduleSubject[i].subjectId
      elem.time = scheduleSubject[i].time
    })
    const newSchedule = await updateSchedule(exists)
    return newSchedule
  }
  const schedules = await schedule.create({
    data: {
      ...data,
      scheduleSubject: {
        createMany: {
          data: scheduleSubject,
        },
      },
    },
  })

  return schedules
}

export const deleteSchedule = async (id) => {
  try {
    const schedules = await schedule.delete({
      where: {
        id,
      },
    })
    return schedules
  } catch (err) {
    throw err.message
  }
}

export const updateSchedule = async ({ id, day, groupId, scheduleSubject }) => {
  try {
    return prisma.$transaction(async (prisma) => {
      const schedules = await prisma.schedule.update({
        data: {
          day,
          groupId,
        },
        where: {
          id,
        },
      })
      for (const { time, subjectId, id: schSubId } of scheduleSubject) {
        const schSubject = await prisma.scheduleSubject.update({
          data: {
            time: new Date(time).toISOString(),
            subjectId,
          },
          where: {
            id: schSubId,
          },
        })
        schedules.scheduleSubject = schSubject
      }
      return schedules
    })
  } catch (err) {
    throw err.message
  }
}
