import axios from "axios";
import {key, proxy} from './config';
export default class Search {
    constructor(query) {
        this.query = query;
    }
    

async getResult() {
   
    const id = '385fe752';
    
    const proxy2 = 'https://crossorigin.me/';
    try {
        const res = await axios(`${proxy}https://api.spoonacular.com/recipes/search?query=${this.query}&number=30&apiKey=${key}`);
        this.result = res.data.results;
        console.log(this.result);
   
    }
    catch(error) {
        alert(error);
    }
    
    

}



}