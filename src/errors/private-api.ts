import { CustomError } from 'ts-custom-error';

export class PrivateApiError extends CustomError {
  public constructor(signature?: string) {
    super(
      `[${signature}] is private api. Consult the docs for more information.`,
    );
  }
}
