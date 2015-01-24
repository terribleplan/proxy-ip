//This is actually of length 7, but the minimum length of toString on numbers is always 1
var maskEight = (new Array (8)).join("0");

function parseIp(ip) {
    var split = ip.split(".");
    if (split.length !== 4) {
        throw new Error("Unable to understand IP address");
    }
    var output = "";
    for (var i = 0; i < 4; i++) {
        output += (maskEight + parseInt(split[i]).toString(2)).slice(-8);
    }
    return output;
}

function parseCidr(cidr) {
    var split = cidr.split("/");
    switch (split.length) {
        case 1:
            return {
                ip: split[0],
                bitmask: 32
            };
        case 2:
            return {
                ip: split[0],
                bitmask: parseInt(split[1])
            };
        default:
            throw new Error("Unable to parse as CIDR IP address");
    }
}

function parse(ipOrCidr) {
    var output = parseCidr(ipOrCidr);
    output.bits = parseIp(output.ip);
    return output;
}

module.exports = parse;