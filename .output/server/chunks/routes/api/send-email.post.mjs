globalThis.__timing__.logStart('Load chunks/routes/api/send-email.post');import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import nodemailer from 'nodemailer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const sendEmail_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "marketingkreasiaresa@gmail.com",
        pass: "adma aexw ohsb aini"
      }
    });
    const formatEmails = (emails) => {
      if (!emails) return void 0;
      const list = Array.isArray(emails) ? emails : [emails];
      return list.filter((e) => e.includes("@")).join(",");
    };
    const mailOptions = {
      from: `"PT. KARYA ARESA MANDIRI" <marketingkreasiaresa@gmail.com>`,
      to: body.to,
      cc: formatEmails(body.cc),
      bcc: formatEmails(body.bcc),
      subject: body.subject,
      html: body.html,
      attachments: (body.attachments || []).map((url, i) => ({
        filename: `file-${i + 1}.pdf`,
        path: url
      }))
    };
    const result = await transporter.sendMail(mailOptions);
    return { status: "ok" };
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return { status: "error", message: error.message };
  }
});

export { sendEmail_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/send-email.post');
//# sourceMappingURL=send-email.post.mjs.map
