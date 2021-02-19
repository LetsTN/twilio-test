import config from 'config'
import client from 'twilio'

export default class SmsService {
  private accountSid: string = config.get('App.twilio.accountSid');
  private authToken: string = config.get('App.twilio.authToken');
  private twiPhoneNumber: string = config.get('App.twilio.phoneNumber');

  public send(message: string, phoneNumber: string) {
    const smsClient = client(this.accountSid, this.authToken);
    const messageSent = smsClient.messages.create({
      body: message,
      from: this.twiPhoneNumber,
      to: phoneNumber
    })

    return messageSent;
  }
}