import { CustomError } from 'ts-custom-error';

export class NotImplementedError extends CustomError {
  public constructor(signature?: string) {
    super(`[${signature}] is not implemented.`);
  }
}
