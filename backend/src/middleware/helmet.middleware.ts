import helmet from "helmet";

export const helmetMiddleware = helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["self"],
            "script-src": ["'self'", "example.com"],
            "base-uri": ["'self'"],
        }
    },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'no-referrer' },
    xssFilter: true,
    xDownloadOptions: false
})