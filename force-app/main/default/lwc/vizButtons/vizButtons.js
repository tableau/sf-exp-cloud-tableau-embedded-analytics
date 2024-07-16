import { LightningElement, track } from 'lwc';

export default class VizButtons extends LightningElement {



    clickedButtonLabel;

    // flag to control display of edit button
    @track showEditButton = true; 

    handleClickForVizMenu(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler Viz Menu @ buttons lwc", this.clickedButtonLabel);

        // create variable called "vizMenuEvent" and assign value of custom event called "vizmenu" 
        // which routes the pdf export button click to parent lwc
        const vizMenuEvent = new CustomEvent('vizmenu', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(vizMenuEvent);

    }

    handleClickForHome(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler Home Page @ buttons lwc", this.clickedButtonLabel);

            // create variable called "goHomeEvent" and assign value of custom event called "gohome" 
        // which routes the pdf export button click to parent lwc
        const goHomeEvent = new CustomEvent('gohome', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(goHomeEvent);

    }
    
    handleClickForNewTask(event) {
        
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler new task @ buttons lwc", this.clickedButtonLabel);

            // create variable called "vizRevertEvent" and assign value of custom event called "vizrevert" 
        // which routes the pdf export button click to parent lwc
        const newTaskEvent = new CustomEvent('newtask', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(newTaskEvent);

    }    
    
    handleClickForRevertViz(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler Revert Viz @ buttons lwc", this.clickedButtonLabel);

            // create variable called "vizRevertEvent" and assign value of custom event called "vizrevert" 
        // which routes the pdf export button click to parent lwc
        const vizRevertEvent = new CustomEvent('vizrevert', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(vizRevertEvent);

    }

    handleClickForPDFexport(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler PDF Export @ buttons lwc", this.clickedButtonLabel);

            // create variable called "pdfExportEvent" and assign value of custom event called "pdf" 
        // which routes the pdf export button click to parent lwc
        const pdfExportEvent = new CustomEvent('pdf', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(pdfExportEvent);

    }

    // standard web api "onclick" global event calls this event handler function
    handleClickForPPTexport(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler PPT Export @ buttons lwc", this.clickedButtonLabel);

        // create variable called "pptExportEvent" and assign value of custom event called "ppt" 
        // which routes the ppt export button click to parent lwc
        const pptExportEvent = new CustomEvent('ppt', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(pptExportEvent);

    }

    // standard web api "onclick" global event calls this event handler function
    handleClickForImageExport(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler Image Export @ buttons lwc", this.clickedButtonLabel);

            // create variable called "ImageExportEvent" and assign value of custom event called "image" 
        // which routes the image export button click to parent lwc
        const ImageExportEvent = new CustomEvent('image', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(ImageExportEvent);

    }

    // standard web api "onclick" global event calls this event handler function
    handleClickForDataExport(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler Data Export @ buttons lwc", this.clickedButtonLabel);

            // create variable called "DataExportEvent" and assign value of custom event called "datax" 
        // which routes the image export button click to parent lwc
        const DataExportEvent = new CustomEvent('datax', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(DataExportEvent);

    }

    // standard web api "onclick" global event calls this event handler function
    handleClickForWebEdit(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler Web Edit @ buttons lwc", this.clickedButtonLabel);

            // create variable called "webEditEvent" and assign value of custom event called "pdf" 
        // which routes the pdf export button click to parent lwc
        const webEditEvent = new CustomEvent('webedit', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(webEditEvent);

    }

    handleClickForFilter(event) {
        this.clickedButtonLabel = event.target.label;
        console.log("onclick event handler Web Edit @ buttons lwc", this.clickedButtonLabel);

            // create variable called "webEditEvent" and assign value of custom event called "pdf" 
        // which routes the pdf export button click to parent lwc
        const filterEvent = new CustomEvent('filter', {
            
            // pass onclick data in custom event
            // note: we don't need to pass this data for this event
            // but this is how we would pass values
            // e.g. filter values
            detail: this.clickedButtonLabel
        });
        
        // dispatch the custom event
        this.dispatchEvent(filterEvent);


    }
    


    



}