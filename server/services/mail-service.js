const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "evseysharing@gmail.com",
        pass: "vqcqwuxefbzmmtmi",
      },
    });
  }

  async sendMail(to, activationLink) {
    await this.transporter.sendMail({
      from: "evseysharing@gmail.com",
      to,
      subject: `Активируйте ваш аккаунт на ${process.env.CLIENT_URL}`,
      text: "",
      html: `
            <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href=${activationLink}>${activationLink}</a>
            </div>
            `,
    });
  }
}
module.exports = new MailService();