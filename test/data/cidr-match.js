var cloudflare = require('../../ranges/cloudflare');

module.exports = [
    {
        input: ["0.0.0.0/0"],
        matchInput: "192.168.0.34",
        output: true
    },
    {
        input: ["192.168.0.0/24"],
        matchInput: "192.168.0.34",
        output: true
    },
    {
        input: ["192.168.0.0/24"],
        matchInput: "192.168.1.34",
        output: false
    },
    {
        input: ["192.168.0.0/24", "192.168.1.0/24"],
        matchInput: "192.168.1.34",
        output: true
    },
    {
        input: cloudflare,
        matchInput: "190.93.240.54",
        output: true
    },
    {
        input: cloudflare,
        matchInput: "8.8.8.8",
        output: false
    }
];