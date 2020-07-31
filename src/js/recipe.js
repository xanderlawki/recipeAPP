import axios from 'axios';
import {key, proxy} from './config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`);
            console.log(res.data);
            this.title = res.data.title;
            this.img = res.data.image;
            this.ingredients = res.data.extendedIngredients;
            this.url = res.data.sourceUrl;
            this.author = res.data.sourceName;

        }

        catch(error) {
            alert(error);
        }
        
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    updateServings(type) {
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        this.ingredients.forEach(ing => {
            ing.amount *= (newServings / this.servings)
        })
        
        this.servings = newServings;
    }
}
