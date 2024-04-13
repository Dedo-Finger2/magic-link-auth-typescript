interface IAdress {
  name: string;
  address: string;
}

export interface IMessage {
  to: IAdress;
  from: IAdress;
  subject: string;
  html: string;
}

export interface IMailService {
  sendMail(message: IMessage): Promise<void>;
}
