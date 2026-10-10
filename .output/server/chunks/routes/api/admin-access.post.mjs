globalThis.__timing__.logStart('Load chunks/routes/api/admin-access.post');import { d as defineEventHandler, r as readBody, u as useRuntimeConfig, c as createError, s as setCookie } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const adminAccess_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const config = useRuntimeConfig(event);
  if (!/^\d{6}$/.test((_a = body.pin) != null ? _a : "") || body.pin !== config.adminAccessPin) {
    throw createError({ statusCode: 401, statusMessage: "PIN tidak valid" });
  }
  setCookie(event, "sns_admin_access", "granted", {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "strict",
    secure: true
  });
  return { authorized: true };
});

export { adminAccess_post as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/admin-access.post');
//# sourceMappingURL=admin-access.post.mjs.map
