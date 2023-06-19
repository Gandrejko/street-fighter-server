export const checkIsAllRequiredFieldsPresent = (requiredKeys, body) => {
	return requiredKeys.every(key => body.includes(key));
}