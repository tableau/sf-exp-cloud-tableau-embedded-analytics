import { LightningElement } from 'lwc';

export default class VizContainer extends LightningElement {


    handleClick() {
        this.template.querySelector('c-viz-embed').dispatchEvent(new CustomEvent('customclick', { bubbles: true, composed: true }));
    }

    handleCustomClick() {
        console.log('Custom click event received');
    }
    
}