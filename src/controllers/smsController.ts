import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import SmsService from '../services/SmsService';

@Controller('sms')
export class SmsController {

  @Post('')
  public async postSms(req: Request, res: Response): Promise<void> {
    const { message, phoneNumber } = req.body;

    const smsService = new SmsService();

    const messageSent = await smsService.send(message, phoneNumber);

    res.send({
      message: messageSent.body,
      to: messageSent.to,
      dateCreated: messageSent.dateCreated
    });
  }
} 