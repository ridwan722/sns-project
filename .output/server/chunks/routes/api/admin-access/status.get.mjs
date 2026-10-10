globalThis.__timing__.logStart('Load chunks/routes/api/admin-access/status.get');import { d as defineEventHandler, g as getCookie } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const status_get = defineEventHandler((event) => ({
  authorized: getCookie(event, "sns_admin_access") === "granted"
}));

export { status_get as default };;globalThis.__timing__.logEnd('Load chunks/routes/api/admin-access/status.get');
//# sourceMappingURL=status.get.mjs.map
