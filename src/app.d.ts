// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env & { DB: D1Database; BUCKET: R2Bucket };
			cf: CfProperties;
			ctx: ExecutionContext;
		}

		interface Locals {
			user: import('$lib/server/auth').SessionValidationResult['user'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
		}
	}
}

export {};
