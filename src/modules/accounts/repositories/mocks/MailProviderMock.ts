import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider'

export class MailProviderMock implements IMailProvider {
  private message: any[] = []

  async sendMail(to: string, subject: string, variables: any, path: string) {
    this.message.push({
      to,
      subject,
      variables,
      path,
    })
  }
}
