import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getViews from '@salesforce/apex/VizMetadata.getViews';

export default class VizMenu extends NavigationMixin(LightningElement) {
    @track views;

    // Viz
    // selectedView;

    // Config previously stored in custom objects
    // Exp Cloud/Communities navigation differs slightly from Sales Cloud/Internal navigation
    // embedType = 'Community Embed';
    // vizNavPageType = 'comm__namedPage';
    // vizNavMenuPageName = 'viz-menu';
    // vizNavEmbedPageName = 'render-viz';

    handleVizItem1(event) {
        console.log('event.detail:', event.detail);
        const viewId = event.detail;
    
        console.log('this.views:', this.views);
        const selectedView = this.views.find((view) => view.id === viewId);
    
        if (selectedView) {
            console.log('selectedView:', selectedView);
            const contentUrl = selectedView.contentUrl;
    
            const e = new CustomEvent('vizitem2', {
                detail: contentUrl,
                bubbles: true, // Enable bubbling
                composed: true // Allow the event to bubble beyond the shadow boundary
            });
            this.dispatchEvent(e);
        } else {
            console.log('No view found with id:', viewId);
        }
    }

 
    connectedCallback() {
        // Listen for the 'selectEvent' event from vizItem
        // this.addEventListener('selectEvent', this.handleselect);
        getViews()
            .then(result => {
                // Get array of views data only (i.e. don't need pagination info)
                this.views = result.views.view;
                console.log("views metadata: " + this.views);
                console.log("views metadata: " + JSON.stringify(this.views));
            })
            .catch(error => {
                console.error('Error getting views:', error);
            });
    }


// TODO: Create custom event from handleselect and pass this.selectedView.contentUrl to vizEmbed

    // handleselect(event) {
    //     // get the view.id passed in from the custom event detail
    //     const viewId = event.detail;
        
    //     // search for the views list array for the view object with matching view.id
    //     this.selectedView = this.views.find(
    //         (view) => view.id === viewId
    //     );


    //     console.log("handleselect view selection event fired!");
    //     console.log("TABLEAU: view name => ", this.selectedView.name);
    //     console.log("TABLEAU: view url => ", this.selectedView.contentUrl);
    //     console.log("TABLEAU: view object => ", this.selectedView);
        
    //     // let viewUrlToNavTo = this.selectedView.contentUrl;
    //     // let tempEmbedType = this.embedType;
    //     // let tempvizNavPageType = this.vizNavPageType;
    //     // let tempvizNavMenuPageName = this.vizNavMenuPageName;

    //     // //use localStorage for parms used in other components
    //     // window.localStorage.setItem("contentUrl", viewUrlToNavTo);
    //     // window.localStorage.setItem("storeEmbedType", tempEmbedType);
    //     // window.localStorage.setItem("storevizNavPageType", tempvizNavPageType);      // Navmixin page type: standard or comm
    //     // window.localStorage.setItem("vizNavMenuPageName", tempvizNavMenuPageName);   //SF Page created for dynamic content menu

    //     // Create a custom event with the selected view's contentUrl (this will be sent to parent LWC, which is vizEmbedSidebar)
    //     const selectedViewEvent = new CustomEvent('selectedview', {
    //         detail: this.selectedView.contentUrl,
    //         bubbles: true,
    //         composed: true
    //     });
    //     // Dispatch the custom event
    //     this.dispatchEvent(selectedViewEvent);



    //     // Page navigation stuff to navigate from one page to another
    //     // Embedding Tableau into Org Pages requires different type & attributes for page navigation
    //     // if ( this.embedType == "Internal Embed") {
    //     //     // -- Use the built-in 'Navigate' method
    //     //     this[NavigationMixin.Navigate]({
    //     //         //type: 'standard__navItemPage',  // Use standard__navItemPage for embedding outside of Communities (for example...Sales Cloud)
    //     //         type: this.vizNavPageType,
    //     //         attributes: {
    //     //             //apiName: 'render_viz'  // Use apiName for embedding outside of Communities
    //     //             apiName: this.vizNavEmbedPageName
    //     //         }
    //     //     });
    //     // }
    //     // else if ( this.embedType == "Community Embed") {
    //     //     console.log("this.embedType " + this.embedType);
    //     //     // -- Use the built-in 'Navigate' method
    //     //     this[NavigationMixin.Navigate]({
    //     //         //type: 'comm__namedPage',  // Use standard__navItemPage for embedding outside of Communities (for example...Sales Cloud)
    //     //         type: this.vizNavPageType,
    //     //         attributes: {
    //     //             //pageName: 'render-viz'  // Use pageName to embed into Community
    //     //             pageName: this.vizNavEmbedPageName
    //     //         }
    //     //     });
    //     // }
    // }

















}
