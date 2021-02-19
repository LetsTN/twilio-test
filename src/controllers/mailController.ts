import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import MailService from '../services/MailService';

@Controller('mail')
export class MailController {

  @Post('')
  public postEmail(req: Request, res: Response): void {
    const { to, origin, category, description } = req.body;

    const mailService = new MailService();

    const messageSent = mailService.send(to, origin, category, description);

    res.send(messageSent);
  }
} 