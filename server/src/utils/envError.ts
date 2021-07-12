class ErrorReporter {
  private SSO_CLIENT_ID: string
  private SSO_CLIENT_SECRET: string

  constructor(SSO_CLIENT_ID: string, SSO_CLIENT_SECRET: string) {
    if (SSO_CLIENT_ID === undefined || SSO_CLIENT_SECRET === undefined)
      throw new Error('SSO credentials are empty. Initialize your .env file!');

    this.SSO_CLIENT_ID = SSO_CLIENT_ID;
    this.SSO_CLIENT_SECRET = SSO_CLIENT_SECRET;
  }

  report(err: Error) {
    // could use apiKey here to send error somewhere
  }
}

export default new ErrorReporter(process.env.SSO_CLIENT_ID, process.env.SSO_CLIENT_SECRET);