export type AppErrorID = "doc-404" | (string & {});

export class AppError extends Error {
  public name: string = "AppError";
  public id?: AppErrorID;
  public statusText?: string;

  constructor(message: string, id?: AppError["id"]) {
    super(message);
    this.id = id;
  }
}
