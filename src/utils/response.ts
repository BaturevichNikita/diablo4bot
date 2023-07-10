export const makeResponse = (msg, status = 200) => ({
  statusCode: status,
  body: JSON.stringify(msg, null, 2),
});
