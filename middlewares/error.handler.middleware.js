export const errorHandler = (err, req, res, next) => {
	const { message, status } = err;
	res.status(status).json({ error: true, message });
}