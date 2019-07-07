import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
import sgMail from '@sendgrid/mail'
//sgMail.send(sendSecretMail("hd7393@gmail.com", "123"));

export default {
  Mutation: {
    requestSecret: async (_, args , request) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await sgMail.send(sendSecretMail(email, loginSecret));
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};