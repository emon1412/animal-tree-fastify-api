/* eslint-disable no-unused-vars, no-shadow */

import { FastifyReply, FastifyRequest } from 'fastify'
import { HttpError } from 'http-errors'
import { ZodError } from 'zod'

export * from './requests.type'
export * from './models.type'

export interface IRouteHandler {
  handle?(req: FastifyRequest, reply: FastifyReply): void;
  errorHandler(reply: FastifyReply, err: Error, statusCode: number): void;
}

export type ApiError = HttpError | ZodError | Error;
