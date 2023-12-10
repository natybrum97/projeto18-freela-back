import httpStatus from 'http-status';

export function handleApplicationErrors(err, _req, res, next) {
  if (err.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  if (err.name === 'Unauthorized') return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });

  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error'
  });
}
