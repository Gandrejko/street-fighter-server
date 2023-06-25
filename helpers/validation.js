export const checkIsAllRequiredFieldsPresent = (requiredKeys, body) => {
	return requiredKeys.every(key => body.includes(key));
}

export const checkIsNotHaveExtraKey = (requiredKeys, body) => {
	return !body.filter(key => !requiredKeys.includes(key)).length;
}