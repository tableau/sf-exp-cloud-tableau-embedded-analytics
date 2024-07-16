public with sharing class CATokenGenerator {

    public CATokenGenerator() {

    }

    // CA for eacloud
    private static final String ts_ca_iss = '1d92b243-e331-4eb4-a78d-20ab84e00848';
    private static final String ts_ca_kid = 'e4a54a9b-c20d-4b92-b613-5a5057f9d9cb';
    private static final String ts_ca_secret ='bvr3qjSaPV+a7YVa5JUpoE/H204OZrt/4YTQ+c1czwk=';

    

    // Returns user's email & division (Map)
    // @AuraEnabled annotation makes the method accessible via LWC
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getUserDetails() {
        User currentUser = [SELECT Email, Division FROM User WHERE Id = :UserInfo.getUserId()];
        Map<String, String> userDetails = new Map<String, String>{
            'Email' => currentUser.Email,
            'Division' => currentUser.Division
        };
        return userDetails;
    }

    // helper to convert comma delimited strings to list
    public static List<String> convertStringToList(String input) {
        return input.split(',\\s*');
    }

    // helper to get authenticated user's Division field for UAF
    public static String getCurrentUserDivision() {
        User currentUser = [SELECT Division FROM User WHERE Id = :UserInfo.getUserId()];
        return currentUser.Division;
    }

    // helper to get aauthenticated user's username
    public static String getCurrentUserUsername() {
        User currentUser = [SELECT Username FROM User WHERE Id = :UserInfo.getUserId()];
        return currentUser.Username;
    }

    // helper method for base64 url encoding
    private static String base64UrlEncode(Blob input) {
        String output = EncodingUtil.base64Encode(input);
        output = output.replace('+', '-');
        output = output.replace('/', '_');
        output = output.replace('=', '');
        return output;
    }

    // helper to create a list of required Tableau claims
    public static List<String> getTableauClaims(String input) { 
        List<String> scopes;
        if (input == 'SSO') {
            // Add tableau scopes (List)
            scopes = new List<String>{
                'tableau:views:embed',
                'tableau:views:embed_authoring',
                'tableau:metrics:embed'
            };
        } else if (input == 'REST_API') {
            // Add tableau scopes (List)
            scopes = new List<String>{
                'tableau:content:read',
                'tableau:views:download',
                'tableau:views:embed',
                'tableau:views:embed_authoring',
                'tableau:metrics:embed'
            };
        }
        return scopes;
    }
   
    // Returns JWT (String)
    // @AuraEnabled annotation makes the method accessible via LWC 
    @AuraEnabled(cacheable=true)
    public static String generateJWT(String tokenType) {
        // Header (Map)
        Map<String, String> header = new Map<String, String>();
        header.put('alg', 'HS256');
        header.put('iss', ts_ca_iss);
        header.put('kid', ts_ca_kid);
        header.put('typ', 'JWT');
        // Claims (Map)
        Map<String, Object> claims = new Map<String, Object>();
        claims.put('iss', ts_ca_iss);
        // Add expiration
        Datetime now = Datetime.now();
        Datetime exp = now.addMinutes(5);
        claims.put('exp', exp.getTime()/1000); // Convert to seconds
        // Add UUID
        Blob base = Crypto.GenerateAESKey(128);
        String h = EncodingUtil.ConvertTohex(base);
        String uuid = h.SubString(0,8)+ '-' + h.SubString(8,12) + '-' + h.SubString(12,16) + '-' + h.SubString(16,20) + '-' + h.substring(20);
        claims.put('jti', uuid); 
        claims.put('aud', 'tableau');
        claims.put('sub', getCurrentUserUsername());
        List<String> scp = getTableauClaims(tokenType);
        claims.put('scp', scp);
        String uafValues = getCurrentUserDivision();
        List<String> uafValuesList = convertStringToList(uafValues);
        claims.put('Region', uafValuesList);
        // Encode Header and Claims
        String encodedHeader = base64UrlEncode(Blob.valueOf(JSON.serialize(header)));
        String encodedClaims = base64UrlEncode(Blob.valueOf(JSON.serialize(claims)));
        // Create JWT
        String jwt = encodedHeader + '.' + encodedClaims;
        // Sign JWT 
        Blob hmacData = Crypto.generateMac('hmacSHA256', Blob.valueOf(jwt), Blob.valueOf(ts_ca_secret));
        // Encode JWT
        String signature = base64UrlEncode(hmacData);
        // Add signature to JWT
        jwt += '.' + signature;
        return jwt;
    }
}