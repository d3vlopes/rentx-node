import { injectable } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider } from '../IMailProvider'

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then(({ smtp, user, pass }) => {
        const transporter = nodemailer.createTransport({
          host: smtp.host,
          port: smtp.port,
          secure: smtp.secure,
          auth: { user, pass },
        })

        this.client = transporter
      })
      .catch((error) => console.log(error))
  }

  async sendMail(to: string, subject: string, body: string) {
    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      text: body,
      html: body,
    })

    console.log('Message send: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
