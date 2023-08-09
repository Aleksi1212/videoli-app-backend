import { z } from 'zod';

const envVariables = z.object({
    HOST: z.string(),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    SESSION_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
});

envVariables.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv 
            extends z.infer<typeof envVariables> {}
    }
}