import Mail from "nodemailer/lib/mailer";
import { IMailService, IMessage } from "./interfaces/email-sender-service";
import nodemailer from "nodemailer";

class MailTrapMailService implements IMailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "94cf7f25f59179",
        pass: "445f041fcb6427",
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.address,
      },
      from: {
        name: message.from.name,
        address: message.from.address,
      },
      subject: message.subject,
      html: message.html,
    });
  }
}

export default new MailTrapMailService();
