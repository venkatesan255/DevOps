// Function to create JWT using built-in crypto module
function generateJWT(header, payload, secretKey) {
    // Encode header and payload
    var encodedHeader = base64UrlEncode(JSON.stringify(header));
    var encodedPayload = base64UrlEncode(JSON.stringify(payload));
    
    // Create token without signature
    var token = encodedHeader + '.' + encodedPayload;
    
    // Create signature
    var signature = createSignature(token, secretKey);
    
    // Combine token and signature
    var jwt = token + '.' + signature;
    
    return jwt;
}

// Function to create signature
function createSignature(data, secretKey) {
    var signature = CryptoJS.HmacSHA256(data, secretKey);
    return base64UrlEncode(signature.toString(CryptoJS.enc.Base64));
}

// Function to encode data to base64 URL encoding
function base64UrlEncode(input) {
    var encoded = encodeBase64(input);
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Function to encode data to base64
function encodeBase64(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }

    return output;
}

// Define your header
var header = {
    "alg": "RS256",
    "typ": "JWT"
};

// Define your payload
var now_date = Math.round(Date.now() / 1000);
var exp_date = Math.round(600 + Date.now() / 1000);
var payload = {
    "sub": "your_client_id",
    "iss": "your_client_id",
    "scope": "your_scope",
    "aud": "token_url",
    "iat": now_date,
    "exp": exp_date
};

// Define your secret key
var secretKey = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDsEJO0uaKQw4YKptnbae8I2j0Jf9WAHOJZJQSzttJ9u6z0DzqlgsSqRuRNnTeh58NCZQzQKTHxavJcs1xN0HUqxqhGR6rwPEmqi7sn9e+1Ybh2Oj4NYutx74yks2ye1HYjoX+niUOHotKqGRGU439KovCn6V7f4Nae8ckaAzVu8t6Wp5H8FDPhkj9aD/rkz4j5rQ8AfPMCxhF2qYLMmeI0WPd8O5GG09VIG2KNGKau6Eqxlu9cfOLtgAKS2oz+RZ7Xxwe16mA+O59g4pf20U2GcdZif0GT+Ubea2TwV3d+LgaSGCqwJUoVS46Emd5Ijs+15yLq1W3SANHjMebAJl3VAgMBAAECggEADBVOzjUjUwLNxBKle55Dmpcl1oGOht5+Somty4TRPOzZQ0Ev+LlbF4vbPfV3xnKOc4H9zX48/Mpt30dcs0H3QV+GTQSi8BA8mr1zcMNICBIusY81I7/GD/YETl49x4UrX+hcGFIFx3X9j7CKo8L0/iJy1ubH5ltD+RekuiS4ZzZE+jrS62n+mhxWyoByXksKPDdziWr3h1xpzK875/sgGQXdewelz7HErKKUMobrcMCrHktMNk63VcFp7242aq1z5syL80Y+j1EcLqGR5zpW/0xWd433zKbVThDcI4w4EiNM4Dsp2BWc4G4DxQ9AA0+joUdgDeDJo8cL6WK3eXacaQKBgQD3VqK5etSpOA9Xi9bz1Dm1hF/7ZAxUUyjBL74es9FwayRiFP+gLayL5jNulA43l7yA9bkhDdYD48iNIVIOS1DleKzqobIvqP8VfGiC8wQ2snmzkhmbVvgxgc3ZlAfCs2FofKMJYXAS4xplch+na8oecmC+KGGyQ0TZWT+Cvsp4fQKBgQD0VN/AmB+ViqDCB6FqUU/9mhHobxpiIbOFcoYT8eLZa8zuNvmjcbhoI0cilf74Z0xbuXTMS8UmhTrpzTmsuxfiyL4wCzf+GM6b71hUbx+2kStd22xH3HUgtvoim7g6Q0A7PiLQW6pWaVFX2MBG/DxtLEY+6ghe89d/zaiutxfSOQKBgGmDpgumYM6HwdPBLkP6h1vuStv9xFy81SgE7ABBCdoBexX0i1CT64YLAGnt81q3+oyxRvbY5jHmnInIay755lrebjXyIQe/+oH5/sPOVD/ZR53Zd98S7PKBw4VMZzsiNy3R7eN0k9Ea3Qnl86cCjskKVkcJBxR7KgXm0vc92TYpAoGARNQ8DCdOjnP1AXPg1vB9FjX24YGa7xYLWoZ+mtPDUfh6TIkUHiUFC+EUQvv6TcPb0OMXsg2ORmG1zPNRUgWKnwpp+WLPrTcTzP3J5k8/odCXZONRR5UlMcgaAvHXHiKfz5CbghKwk5MrpRGcaOLZqu+UAlkvboBGruwinsVZYpECgYBcfZy651Vgr5n3NuvCLCgKd8ZGm4ucBn/UpHtQQLFQItFTJv24AbsluXbqKCmdNejyrDZByoe+ar+ohGsG1M0vHglwjL+oj9W2fGpxnYn+jGLFkRrLnYsBajznjaMuTiz6AdMno36d9MnxHXrJ4ogN8FfEBdC0D4Tq8vgw6cuUGQ==";

// Generate the JWT with the payload, header, and secret key
var token = generateJWT(header, payload, secretKey);

// Store the JWT in a NeoLoad variable if needed
context.variableManager.setValue("JWTToken", token);
logger.info(token);
