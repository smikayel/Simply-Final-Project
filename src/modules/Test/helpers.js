export const changeStructureForAnswers = (req_body, questionsIds) => {
	const answersNested = Object.values(req_body);
	const answers = answersNested.reduce((acc, element, index) => {
		const answer = element.map((el) => {
			return { "name": el , "questionId": questionsIds[index]}
		});
		acc.push(...answer);
		return acc;
	}, []);
	return answers;
}