2026-11-18T19:33:01.367Z	Initializing build environment...
2026-11-18T19:33:08.576Z	Success: Finished initializing build environment
2026-11-18T19:33:09.259Z	Cloning repository...
2026-11-18T19:33:10.494Z	No build output detected to cache. Skipping.
2026-11-18T19:33:10.494Z	No dependencies detected to cache. Skipping.
2026-11-18T19:33:10.499Z	Detected the following tools from environment: bun@1.4.4, nodejs@24.22.1
2026-11-18T19:33:10.508Z	Installing project dependencies: bun install
2026-11-18T19:33:10.841Z	bun install v1.4.4 (38afee6c8)
2026-11-18T19:33:10.858Z	Resolving dependencies
2026-11-18T19:33:20.906Z	Resolved, downloaded and extracted [1715]
2026-11-18T19:33:20.911Z	warn: deprecated eslint@9.39.4: This version is no longer supported. Please see https://eslint.org/version-support for other options.
2026-11-18T19:33:22.231Z	Saved lockfile
2026-11-18T19:33:22.232Z	
2026-11-18T19:33:22.232Z	+ @tailwindcss/postcss@4.1.17 (v4.3.5 available)
2026-11-18T19:33:22.233Z	+ @types/node@22.19.15 (v26.6.6 available)
2026-11-18T19:33:22.233Z	+ @types/pg@8.18.0 (v8.23.1 available)
2026-11-18T19:33:22.234Z	+ @types/react@19.2.14 (v19.3.0 available)
2026-11-18T19:33:22.234Z	+ @types/react-dom@19.2.3 (v19.3.0 available)
2026-11-18T19:33:22.235Z	+ drizzle-kit@0.31.10 (v0.31.11 available)
2026-11-18T19:33:22.235Z	+ eslint@9.39.4 (v10.15.0 available)
2026-11-18T19:33:22.235Z	+ eslint-config-next@16.4.2 (v16.4.6 available)
2026-11-18T19:33:22.236Z	+ postcss@8.5.23 (v8.5.33 available)
2026-11-18T19:33:22.236Z	+ tailwindcss@4.1.17 (v4.3.5 available)
2026-11-18T19:33:22.236Z	+ typescript@5.9.3 (v7.0.2 available)
2026-11-18T19:33:22.236Z	+ @types/canvas-confetti@1.9.0
2026-11-18T19:33:22.237Z	+ canvas-confetti@1.9.4
2026-11-18T19:33:22.237Z	+ dotenv@17.3.1 (v18.0.10 available)
2026-11-18T19:33:22.237Z	+ drizzle-orm@0.45.2 (v0.45.4 available)
2026-11-18T19:33:22.238Z	+ lucide-react@1.75.0
2026-11-18T19:33:22.238Z	+ next@16.4.2 (v16.4.6 available)
2026-11-18T19:33:22.238Z	+ pg@8.20.0 (v8.23.1 available)
2026-11-18T19:33:22.238Z	+ react@19.2.6 (v19.3.1 available)
2026-11-18T19:33:22.239Z	+ react-dom@19.2.6 (v19.3.1 available)
2026-11-18T19:33:22.239Z	
2026-11-18T19:33:22.239Z	387 packages installed [11.45s]
2026-11-18T19:33:22.398Z	Executing user build command: npm run build
2026-11-18T19:33:23.422Z	
2026-11-18T19:33:23.423Z	> build
2026-11-18T19:33:23.423Z	> next build
2026-11-18T19:33:23.423Z	
2026-11-18T19:33:24.619Z	▲ Next.js 16.4.2 (Turbopack)
2026-11-18T19:33:24.744Z	✓ Running next.config.ts took 124ms
2026-11-18T19:33:24.745Z	⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
2026-11-18T19:33:24.754Z	Attention: Next.js now collects completely anonymous telemetry regarding usage.
2026-11-18T19:33:24.755Z	This information is used to shape Next.js' roadmap and prioritize features.
2026-11-18T19:33:24.755Z	You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
2026-11-18T19:33:24.755Z	https://nextjs.org/telemetry
2026-11-18T19:33:24.755Z	
2026-11-18T19:33:24.812Z	
2026-11-18T19:33:24.870Z	  Creating an optimized production build ...
2026-11-18T19:33:38.996Z	✓ Compiled successfully in 14.1s
2026-11-18T19:33:39.014Z	  Running TypeScript ...
2026-11-18T19:33:49.801Z	src/app/api/auth/route.ts(15,26): error TS2551: Property 'avatarUrl' does not exist on type 'PgTableWithColumns<{ name: "users"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "users"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; ... 6 more ...; generated: undefined; }, {}, {}>; ... 4 more ...; created_at: PgColumn<...>;...'. Did you mean 'avatar'?
2026-11-18T19:33:49.801Z	src/app/api/auth/route.ts(17,21): error TS2339: Property 'role' does not exist on type 'PgTableWithColumns<{ name: "users"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "users"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; ... 6 more ...; generated: undefined; }, {}, {}>; ... 4 more ...; created_at: PgColumn<...>;...'.
2026-11-18T19:33:49.801Z	src/app/api/auth/route.ts(18,26): error TS2551: Property 'createdAt' does not exist on type 'PgTableWithColumns<{ name: "users"; schema: undefined; columns: { id: PgColumn<{ name: "id"; tableName: "users"; dataType: "number"; columnType: "PgSerial"; data: number; driverParam: number; notNull: true; hasDefault: true; ... 6 more ...; generated: undefined; }, {}, {}>; ... 4 more ...; created_at: PgColumn<...>;...'. Did you mean 'created_at'?
2026-11-18T19:33:49.802Z	src/app/api/auth/route.ts(72,10): error TS2769: No overload matches this call.
2026-11-18T19:33:49.804Z	  Overload 1 of 2, '(value: { username: string | SQL<unknown> | Placeholder<string, any>; password: string | SQL<unknown> | Placeholder<string, any>; id?: number | SQL<unknown> | Placeholder<...> | undefined; avatar?: string | ... 2 more ... | undefined; bio?: string | ... 3 more ... | undefined; created_at?: SQL<...> | ... 2 more ... | undefined; }): PgInsertBase<...>', gave the following error.
2026-11-18T19:33:49.804Z	    Object literal may only specify known properties, but 'passwordHash' does not exist in type '{ username: string | SQL<unknown> | Placeholder<string, any>; password: string | SQL<unknown> | Placeholder<string, any>; id?: number | SQL<unknown> | Placeholder<...> | undefined; avatar?: string | ... 2 more ... | undefined; bio?: string | ... 3 more ... | undefined; created_at?: SQL<...> | ... 2 more ... | undefi...'. Did you mean to write 'password'?
2026-11-18T19:33:49.804Z	  Overload 2 of 2, '(values: { username: string | SQL<unknown> | Placeholder<string, any>; password: string | SQL<unknown> | Placeholder<string, any>; id?: number | SQL<unknown> | Placeholder<...> | undefined; avatar?: string | ... 2 more ... | undefined; bio?: string | ... 3 more ... | undefined; created_at?: SQL<...> | ... 2 more ... | undefined; }[]): PgInsertBase<...>', gave the following error.
2026-11-18T19:33:49.805Z	    Object literal may only specify known properties, and 'username' does not exist in type '{ username: string | SQL<unknown> | Placeholder<string, any>; password: string | SQL<unknown> | Placeholder<string, any>; id?: number | SQL<unknown> | Placeholder<...> | undefined; avatar?: string | ... 2 more ... | undefined; bio?: string | ... 3 more ... | undefined; created_at?: SQL<...> | ... 2 more ... | undefi...'.
2026-11-18T19:33:49.805Z	src/app/api/auth/route.ts(91,34): error TS2551: Property 'avatarUrl' does not exist on type '{ id: number; username: string; password: string; avatar: string; bio: string | null; created_at: Date; }'. Did you mean 'avatar'?
2026-11-18T19:33:49.805Z	src/app/api/auth/route.ts(94,36): error TS2551: Property 'avatarUrl' does not exist on type '{ id: number; username: string; password: string; avatar: string; bio: string | null; created_at: Date; }'. Did you mean 'avatar'?
2026-11-18T19:33:49.805Z	src/app/api/auth/route.ts(103,34): error TS2551: Property 'avatarUrl' does not exist on type '{ id: number; username: string; password: string; avatar: string; bio: string | null; created_at: Date; }'. Did you mean 'avatar'?
2026-11-18T19:33:49.806Z	src/app/api/auth/route.ts(106,36): error TS2551: Property 'avatarUrl' does not exist on type '{ id: number; username: string; password: string; avatar: string; bio: string | null; created_at: Date; }'. Did you mean 'avatar'?
2026-11-18T19:33:49.806Z	src/app/api/auth/route.ts(114,48): error TS2769: No overload matches this call.
2026-11-18T19:33:49.812Z	  Overload 1 of 2, '(value: { sender_id: number | SQL<unknown> | Placeholder<string, any>; sender_username: string | SQL<unknown> | Placeholder<string, any>; receiver_id: number | SQL<...> | Placeholder<...>; ... 4 more ...; sender_avatar?: string | ... 3 more ... | undefined; }): PgInsertBase<...>', gave the following error.
2026-11-18T19:33:49.812Z	    Argument of type '{ requesterId: number; requesterName: string; requesterAvatar: any; addresseeId: number; addresseeName: string; addresseeAvatar: any; message: string; status: string; }[]' is not assignable to parameter of type '{ sender_id: number | SQL<unknown> | Placeholder<string, any>; sender_username: string | SQL<unknown> | Placeholder<string, any>; receiver_id: number | SQL<...> | Placeholder<...>; ... 4 more ...; sender_avatar?: string | ... 3 more ... | undefined; }'.
2026-11-18T19:33:49.813Z	      Type '{ requesterId: number; requesterName: string; requesterAvatar: any; addresseeId: number; addresseeName: string; addresseeAvatar: any; message: string; status: string; }[]' is missing the following properties from type '{ sender_id: number | SQL<unknown> | Placeholder<string, any>; sender_username: string | SQL<unknown> | Placeholder<string, any>; receiver_id: number | SQL<...> | Placeholder<...>; ... 4 more ...; sender_avatar?: string | ... 3 more ... | undefined; }': sender_id, sender_username, receiver_id, receiver_username
2026-11-18T19:33:49.813Z	  Overload 2 of 2, '(values: { sender_id: number | SQL<unknown> | Placeholder<string, any>; sender_username: string | SQL<unknown> | Placeholder<string, any>; receiver_id: number | SQL<...> | Placeholder<...>; ... 4 more ...; sender_avatar?: string | ... 3 more ... | undefined; }[]): PgInsertBase<...>', gave the following error.
2026-11-18T19:33:49.813Z	    Argument of type '{ requesterId: number; requesterName: string; requesterAvatar: any; addresseeId: number; addresseeName: string; addresseeAvatar: any; message: string; status: string; }[]' is not assignable to parameter of type '{ sender_id: number | SQL<unknown> | Placeholder<string, any>; sender_username: string | SQL<unknown> | Placeholder<string, any>; receiver_id: number | SQL<...> | Placeholder<...>; ... 4 more ...; sender_avatar?: string | ... 3 more ... | undefined; }[]'.
2026-11-18T19:33:49.813Z	      Type '{ requesterId: number; requesterName: string; requesterAvatar: any; addresseeId: number; addresseeName: string; addresseeAvatar: any; message: string; status: string; }' is missing the following properties from type '{ sender_id: number | SQL<unknown> | Placeholder<string, any>; sender_username: string | SQL<unknown> | Placeholder<string, any>; receiver_id: number | SQL<...> | Placeholder<...>; ... 4 more ...; sender_avatar?: string | ... 3 more ... | undefined; }': sender_id, sender_username, receiver_id, receiver_username
2026-11-18T19:33:49.814Z	src/app/api/auth/route.ts(121,30): error TS2551: Property 'avatarUrl' does not exist on type '{ id: number; username: string; password: string; avatar: string; bio: string | null; created_at: Date; }'. Did you mean 'avatar'?
2026-11-18T19:33:49.816Z	src/app/api/auth/route.ts(123,25): error TS2339: Property 'role' does not exist on type '{ id: number; username: string; password: string; avatar: string; bio: string | null; created_at: Date; }'.
2026-11-18T19:33:49.816Z	src/app/api/auth/route.ts(146,21): error TS2551: Property 'passwordHash' does not exist on type '{ id: number; username: string; password: string; avatar: string; bio: string | null; created_at: Date; }'. Did you mean 'password'?
2026-11-18T19:33:49.817Z	src/app/api/auth/route.ts(157,32): error TS2551: Property 'avatarUrl' does not exist on type '{ id: number; username: string; password: string; avatar: string; bio: string | null; created_at: Date; }'. Did you mean 'avatar'?
2026-11-18T19:33:49.817Z	src/app/api/auth/route.ts(159,27): error TS2339: Property 'role' does not exist on type '{ id: number; username: string; password: string; avatar: string; bio: string | null; created_at: Date; }'.
2026-11-18T19:33:49.868Z	Failed to type check.
2026-11-18T19:33:49.868Z	
2026-11-18T19:33:49.996Z	Failed: error occurred while running build command
