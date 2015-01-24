module.exports = [
    {
        setup: [],
        req: {
            socket: {
                remoteAddress: "10.0.2.3"
            },
            headers:{
                "x-forwarded-for": "14.3.2.55, 1.2.3.4"
            }
        },
        result: "10.0.2.3"
    },
    {
        setup: ['cloudflare'],
        req: {
            socket: {
                remoteAddress: "190.93.240.34"
            },
            headers:{
                "x-forwarded-for": "14.3.2.55, 1.2.3.4"
            }
        },
        result: "14.3.2.55"
    },
    {
        setup: ['10.0.0.0/8', 'cloudflare'],
        req: {
            socket: {
                remoteAddress: "10.0.0.2"
            },
            headers:{
                "x-forwarded-for": "190.93.240.34, 1.2.3.4"
            }
        },
        result: "1.2.3.4"
    },
    {
        setup: ['0.0.0.0/0', 'cloudflare'],
        req: {
            socket: {
                remoteAddress: "10.0.0.2"
            },
            headers:{
                "x-forwarded-for": "190.93.240.34, 1.2.3.4"
            }
        },
        result: "1.2.3.4"
    }
];