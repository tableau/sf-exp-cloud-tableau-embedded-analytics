// SDO with BlackTab enabled:
// Username: bking@DF23SDOTabNativeLWC.demo
// Pswd: Summer2023
// Domain: DF23SDOTabNativeLWC
// URL: https://df23sdotabnativelwc.my.salesforce.com


// Load the Tableau Embed v3 API in the head markup
// https://help.salesforce.com/s/articleView?id=sf.community_builder_page_head.htm&type=5
// You can use Head Markup in Builder -> Settigngs -> Advanced -> Edit Head Markup
// <script defer type="module" src="https://us-west-2b.online.tableau.com/javascripts/api/tableau.embedding.3.latest.js"></script>


import {
    LightningElement,
    wire,
    track,
    api
} from 'lwc';
import generateJWT from '@salesforce/apex/CATokenGenerator.generateJWT';
import getUserDetails from '@salesforce/apex/CATokenGenerator.getUserDetails';

export default class VizEmbed extends LightningElement {
    @track jwt;
    @track userDetails;

    viz;
    sheet;
    targetSheet;
    tokenType = 'SSO';


    @api contentUrl;
    viewUrl;
    // will need to make these configurable
    targetViz = 'https://us-west-2b.online.tableau.com/t/eacloud/views/UAFSuperstore/Overview';
    // 'UAFSuperstore/sheets/Overview'
    server = 'https://us-west-2b.online.tableau.com';
    path = '/t/';
    site = 'eacloud';
    workbook = 'UAFSuperstore';
    view = 'Overview';
    params = '?:embed=y';

    _clickedItemId;

    @api 
    get clickedItemId() {
        return this._clickedItemId;
    }

    set clickedItemId(value) {
        this._clickedItemId = value;
        this.handleClickedItemIdChange();
    }

    handleClickedItemIdChange() {
        console.log("handleClickedItemIdChange in vizEmbed fired!");
        // This function will be called whenever clickedItemId changes
        // You can access the new value with this.clickedItemId
    }

    async handleCustomClick() {
        console.log('Custom click event received in vizEmbed');
        
        // Clean up later; this is stuff that didn't work and had to work with Dev for workaround, which is parasedArray
        // await this.viz.exportImageAsync();
        // await this.viz.applyFilterAsync("State", ["Florida", "Georgia"], FilterUpdateType.Add);
        // DOES NOT WORK; DOESN'T ALLOW YOU TO CLONE
        // const filterArray = ["East"];
        // const clonedArray = [...filterArray];
        const filterArray = ["East"];
        const stringified = JSON.stringify(filterArray);
        const parsedArray = JSON.parse(stringified);
        try {
            await this.targetSheet.applyFilterAsync("Region", parsedArray, "replace");
            console.log('Filter applied successfully');
        } catch (error) {
            console.error('Error applying filter: ', error);
        }
    }
    
    connectedCallback() {
        // Listen for the 'selectedview' event
        // this.addEventListener('selectedview', this.handleSelectedView);

        // First Apex call
        getUserDetails()
            .then(result => {
                // Handle the result from the first call
                this.userDetails = result;
                console.log('userDetails: ' + JSON.stringify(this.userDetails));
    
                // Second Apex call
                return generateJWT({ tokenType: this.tokenType });
            })
            .then(result => {
                // Handle the result from the second call
                this.jwt = result;
                console.log('JWT: ' + this.jwt);
                console.log('Link to decode JWT: ' + 'https://jwt.io/#debugger-io?token=' + this.jwt);
                this.initViz(); // Init viz after jwt is fetched
                this.addEventListener('customclick', this.handleCustomClick.bind(this));
            })
            .catch(error => {
                // Handle error
                console.log("error: " + JSON.stringify(error));
            });
    }

 

    get tableauContainer() {
        return this.template.querySelector('.tableau-target-div');
    }

    get vizUrl() {
        
        if (window.localStorage.getItem('contentUrl')) {
            this.contentUrl = window.localStorage.getItem('contentUrl');
            console.log('TABLEAU: URL in local storage => ' + this.contentUrl);
            let parts = this.contentUrl.split('/');
            this.view = parts[parts.length - 1];
            this.workbook = parts[0];
            this.viewUrl = this.server + this.path + this.site + '/views/' + this.workbook + '/' + this.view + this.params;
        }
        else {
            console.log('ERROR: No url found in local stoarge');
            this.viewUrl = this.server + this.path + this.site + '/views/' + this.workbook + '/' + this.view + this.params;
        }
        console.log("this.viewUrl: " + this.viewUrl);
        return this.viewUrl;
    }



    // In the initViz1() method, we create the viz object from the HTML element (container), and then use the viz object to programatically configure the embedded viz.
    // This approach requires the <tableau-viz> web component to be included in the HTML
    initViz() {
        const container = this.tableauContainer;

        if (container) {

            // set viz properties
            container.height = '1000px';
            container.width = '100%';
            container.token = this.jwt;
            container.src = this.vizUrl;
            container.debug = true;

            console.log('container.token: ' + container.token);
            console.log('container.src: ' + container.src);

            let tableauVizElement = this.template.querySelector('[data-id="tableauViz"]');
            
            // Listen for the 'firstinteractive' event, which is fired when the viz has finished loading
            tableauVizElement.addEventListener('firstinteractive', (onFirstInteractiveEvent) => {
                console.log('viz loaded!');
                console.log('target: ' + onFirstInteractiveEvent.target);
                this.viz = onFirstInteractiveEvent.target;
                this.sheet = this.viz.workbook.activeSheet;
                console.log("sheet name: " + this.sheet.name);
                console.log('sheetType: ' + this.sheet.sheetType);

                this.targetSheet = this.sheet.worksheets.find(ws => ws.name == "Sale Map");
                console.log("targetSheet: " + this.targetSheet);
            });

        }
    }

}