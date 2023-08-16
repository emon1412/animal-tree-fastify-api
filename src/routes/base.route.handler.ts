import { FastifyReply } from 'fastify'
import createError, { HttpError, isHttpError } from 'http-errors'
import { IRouteHandler, ApiError } from '../types'

export default class BaseRouteHandler implements IRouteHandler {
  protected successCode: number = 200

  protected createdCode: number = 201

  protected noContentCode: number = 204

  protected internalErrorCode: number = 500

  protected notFoundCode: number = 404

  protected badRequestCode: number = 400

  /**
   * This method handles both internal errors and http errors
   * As long as all layers in the server are wrapped in try-catch, we will be able to throw both types of error from any layer of the code
   * For internal errors, it will respond with obscured 500 'Internal Server Error' but log the detailed error message
   * example: throw Error('Detailed error message');
   * For http errors, it will respond AND log the status and message of your choice.
   * example: throw createError(404, 'Barcode not found');
   */
  errorHandler(reply: FastifyReply, err: ApiError): void {
    let errorMessage: string = 'Internal Server Error'

    let processedError: HttpError

    if (isHttpError(err)) {
      processedError = err
      errorMessage = processedError.message
    } else {
      processedError = createError(500, err)
    }

    const { statusCode, message, stack } = processedError
    console.error(`ErrorHandler: [Status: ${statusCode}] [Message: ${typeof message === 'string' ? message : JSON.stringify(message)}] ${`[${stack}]`}`)

    const responseStatusCode = statusCode
    const responseMessage = errorMessage

    reply.status(responseStatusCode).send({
      statusCode: responseStatusCode,
      message: responseMessage,
    })
  }
}
