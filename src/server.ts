import './util/module-alias';

import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';

import { SmsController } from './controllers/smsController';
import { MailController } from './controllers/mailController';

export class SetupServer extends Server {

  constructor(private port = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const smsController = new SmsController();
    const mailController = new MailController();

    this.addControllers([
      smsController,
      mailController
    ]);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening of port: ', this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}