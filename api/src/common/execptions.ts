import { HttpException } from "./httpException";

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request", details?: unknown) {
    super(message, 400, "Bad Request", details);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(message, 401, "Unauthorized");
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(message, 403, "Forbidden");
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Resource Not Found") {
    super(message, 404, "Not Found");
  }
}

export class ConflictException extends HttpException {
  constructor(message = "Conflict") {
    super(message, 409, "Conflict");
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message = "Internal Server Error") {
    super(message, 500, "Internal Server Error");
  }
}
