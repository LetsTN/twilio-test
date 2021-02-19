import config from 'config';
import sgMail from '@sendgrid/mail';
import Mustache from 'mustache';
import fs from 'fs';

export default class MailService {

  private apiKey: string = config.get('App.sendgrid.apiKey');
  private fromEmail: string = config.get('App.sendgrid.email')

  public send(to: string, origin: string, category: string, description: string) {
    sgMail.setApiKey(this.apiKey);
    let variables = {
      category,
      origin,
      description
    }

    const text = `ALARME ${origin.toUpperCase()} - ${category.toUpperCase()}: ${description}`;
    const html = Mustache.render(fs.readFileSync('src/templates/alarm-email.html', 'utf8'), variables);

    const message = {
      to: to,
      from: this.fromEmail,
      subject: `ALARME ${origin.toUpperCase()} - ${category.toUpperCase()}`,
      text: text,
      html: html,
    };

    sgMail.send(message)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      });

    return message;
  }
}
