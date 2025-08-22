export const successResponse = (
  statusCode: number,
  message: string,
  data: Object = {}
) => ({
  status: statusCode,
  success: true,
  message,
  data,
});

export const errorResponse = (
  statusCode: number,
  message: string,
  details: string | object = {}
) => ({
  statusCode,
  success: false,
  message,
  details,
});
