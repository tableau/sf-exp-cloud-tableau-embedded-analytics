public with sharing class VizMetadata {
    public VizMetadata() {

    }

    // Apex object for Tableau REST API views response
    public class Pagination {
        @AuraEnabled
        public String pageNumber {get; set;}
        @AuraEnabled
        public String pageSize {get; set;}
        @AuraEnabled
        public String totalAvailable {get; set;}
    }

    public class Tag {
        @AuraEnabled
        public String label {get; set;}
    }

    public class Workbook {
        @AuraEnabled
        public String id {get; set;}
    }

    public class Owner {
        @AuraEnabled
        public String id {get; set;}
    }

    public class Project {
        @AuraEnabled
        public String id {get; set;}
    }

    public class Location {
        @AuraEnabled
        public String id {get; set;}
        @AuraEnabled
        public String type {get; set;}
    }

    public class View {
        @AuraEnabled
        public Workbook workbook {get; set;}
        @AuraEnabled
        public Owner owner {get; set;}
        @AuraEnabled
        public Project project {get; set;}
        @AuraEnabled
        public Map<String, List<Tag>> tags {get; set;}
        @AuraEnabled
        public Location location {get; set;}
        @AuraEnabled
        public String id {get; set;}
        @AuraEnabled
        public String name {get; set;}
        @AuraEnabled
        public String contentUrl {get; set;}
        @AuraEnabled
        public String createdAt {get; set;}
        @AuraEnabled
        public String updatedAt {get; set;}
        @AuraEnabled
        public String viewUrlName {get; set;}
    }

    public class Views {
        @AuraEnabled
        public Pagination pagination {get; set;}
        @AuraEnabled
        public Map<String, List<View>> views {get; set;}
    }



    // @AuraEnabled annotation makes the method accessible via LWC
    @AuraEnabled(cacheable=true)
    public static VizMetadata.Views getViews() {

        // Get auth token & site id for Tableau REST API calls
        String authToken;
        String siteId;

        VizMetadata.SignInResponse signinresponse = VizMetadata.signIn();
        System.debug('signinresponse: ' + signinresponse);
        if (signinresponse != null && signinresponse != null && signinresponse.credentials != null) {
            authToken = signinresponse.credentials.token;
            siteId = signinresponse.credentials.site.id;
        } else {
            System.debug('Signin response or its properties are null');
        }

        
        String projectName = 'Standard Content';
        String filterExpression = 'projectName:eq:' + projectName;



        String endpoint = 'https://us-west-2b.online.tableau.com/api/3.21/sites/' + siteId + '/views?filter=' + EncodingUtil.urlEncode(filterExpression, 'UTF-8');
        // String endpoint = 'https://us-west-2b.online.tableau.com/api/3.21/sites/' + siteId + '/views';
        System.debug('endpoint: ' + endpoint);

        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/json');

        // Set the header with auth token
        req.setHeader('X-Tableau-Auth', authToken);

        Http http = new Http();
        HttpResponse res = http.send(req);
        System.debug('res.getBody(): ' + res.getBody());

        if (res.getStatusCode() == 200) {
            // Parse the JSON response and convert to Apex object
            VizMetadata.Views data = (VizMetadata.Views) JSON.deserialize(res.getBody(), VizMetadata.Views.class);
            System.debug('views data: ' + data);
            return data;
        } else {
            System.debug('HTTP request failed with status code: ' + res.getStatusCode());
            return null;
        }
    }

    // Apex object for Tableau REST API authentication response
    public class SignInResponse {
        public Credentials credentials;
    }
    
    public class Credentials {
        public String token;
        public Site site;
        public User user;
    }
    
    public class Site {
        public String id;
        public String contentUrl;
    }
    
    public class User {
        public String id;
    }

    // @AuraEnabled annotation makes the method accessible via LWC
    @AuraEnabled(cacheable=true)
    public static VizMetadata.SignInResponse signIn() {
        // Get JWT for authenticating to Tableau REST API
        // String jwt = CATokenGenerator.generateJWT('REST_API');
        String tokenType = 'REST_API';
        String jwt = CATokenGenerator.generateJWT(tokenType);
        System.debug('jwt: ' + jwt);
        String endpoint = 'https://us-west-2b.online.tableau.com/api/3.21/auth/signin';

        // Create the request
        Map<String, Object> site = new Map<String, Object>();
        site.put('contentUrl', 'eacloud');

        Map<String, Object> credentials = new Map<String, Object>();
        credentials.put('jwt', jwt);
        credentials.put('site', site);

        Map<String, Object> body = new Map<String, Object>();
        body.put('credentials', credentials);

        String bodyString = JSON.serialize(body);

        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/json');
        req.setBody(bodyString);

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            System.debug('Response body: ' + res.getBody());
            // Parse the JSON response and convert to Apex object
            VizMetadata.SignInResponse data = (VizMetadata.SignInResponse) JSON.deserialize(res.getBody(), VizMetadata.SignInResponse.class);
            // Return the Tableau REST API Auth object
            return data;
        } else {
            System.debug('HTTP request failed with status code: ' + res.getStatusCode());
            return null;
        }
    }
    


}

