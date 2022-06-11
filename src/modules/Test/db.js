import { prisma } from '../../services/Prisma.js'
import { changeStructureForAnswers } from './helpers.js';
import includes from './includes.js';

export const getAllTests = async () => {
	try {
		const allTests = await prisma.test.findMany({
			include: includes,
		});
		return allTests;
	} catch (error) {
		throw error;
	}
}

export const getTest = async (id) => {
	try {
		const foundedTest = await prisma.test.findUnique({
			where: { id },
			include: includes,
		});
		return foundedTest;
	} catch (error) {
		throw error;
	}
}

export function createTests(testData) {
	return prisma.$transaction(async (prisma) => {
		const newTest = await prisma.Test.create({
			data: {
				name: testData.name,
				subjectId: testData.subjectId,
				start: testData.start,
				length: testData.length,
				questions: {
					create: testData.questions,
				},
			},
			include: includes,
		});

		const questions = newTest.questions;
		const questionsIds = questions.reduce((acc, element) => {
			acc.push(element.id);
			return acc;
		}, []);
		const answersData = changeStructureForAnswers(testData.answers, questionsIds);

		const newAnswers = await prisma.Answer.createMany({
			data: answersData
		})
		const newUserTest = await prisma.UserTest.create({
			data: {userId: testData.userId ,testId: newTest.id}
		})
		return newTest
	});
}


// export const deleteTest = async (testData) => {
// 	try {
// 		const deletedTest = await prisma.UserTest.delete({
// 			where: {
// 				id: testData.id
// 			},
// 			// include: includes,
// 		});
// 		return deletedTest;
// 	} catch (error) {
// 		throw error;
// 	}
// }