module.exports = [
    {
        input: "192.168.1.0/24",
        output: {
            ip: "192.168.1.0",
            bitmask: 24,
            bits: "11000000101010000000000100000000"
        }
    },
    {
        input: "10.0.0.1",
        output: {
            ip: "10.0.0.1",
            bitmask: 32,
            bits: "00001010000000000000000000000001"
        }
    }
];
