import Search from './search';
import { element, renderLoader, clearloader } from './base';
import * as SearchView from './searchview';
import * as RecipeView from './recipeView';
import * as ListView from './listView';
import Recipe from './recipe';
import List from './list';
import Like from './like';
import * as likeView from './likeView';







const state = {}
const controlsearch = async ()=> {
    //get query from view///
    const query = SearchView.getSearchInput();
    
    ////new search object and add to state////
    if(query) {
       

        state.search = new Search(query);
        
        ///prepare ui for results
        SearchView.clearInput();
        SearchView.clearResult();
        renderLoader(element.resultloader);
       
        ///get recipes///
        
            await state.search.getResult();
        clearloader();
        SearchView.renderResult(state.search.result);
        }
        
        
    }
    


element.searchResult.addEventListener('submit', e => {
    e.preventDefault();
    controlsearch();

})
const search = new  Search('pizza')


element.searchrespages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotopage = parseInt(btn.dataset.goto, 10);
        console.log(gotopage)
        SearchView.clearResult();
        SearchView.renderResult(state.search.result, gotopage); 
        
         

    }
})

const r = new Recipe(492560);
r.getRecipe();


const controlRecipe = async ()=> {
    const id = window.location.hash.replace('#', '');
    if(id) {
        RecipeView.clearRecipe();
        renderLoader(element.recipe)
       if(state.search) SearchView.highlight(id);
        ////prepare UI for changes
        state.recipes = new Recipe(id);
        
        /// get recipe data
        
            await state.recipes.getRecipe();

            //  calculate savings and time
              state.recipes.calcTime();
              state.recipes.calcServings();
              clearloader();
             RecipeView.renderRecipe(state.recipes, 
                state.likes.isLiked(id));
           
        
        
       
    }
    
}


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlList = ()=> {
    if(!state.list) state.list = new List();
       state.recipes.ingredients.forEach(el => {
        const item = state.list.addItem(el.amount, el.unit, el.name)
        ListView.RenderItem(item);

       })
      
    }
    
const controlLike = ()=> {
    if(!state.likes) state.likes = new Like();
    const currentID = state.recipes.id;
    if(!state.likes.isLiked(currentID)) {
        const newLike = state.likes.addLike(currentID, state.recipes.title, state.recipes.author, state.recipes.img)
       

        likeView.toggleButton(true);
        likeView.renderLike(newLike);
    }
    else {
        state.likes.deleteLike(currentID);
        console.log(state.likes);

        likeView.toggleButton(false);
        likeView.deleteLike(currentID);
    }
    likeView.toggleMenu(state.likes.getnumLikes()); 
}

window.addEventListener('load', ()=> {
    state.likes = new Like();
    state.likes.readStorage();

    likeView.toggleMenu(state.likes.getnumLikes()); 

    state.likes.likes.forEach(like => likeView.renderLike(like));

})
element.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.item;
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        ListView.deleteItem(id);
    } else if(e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
})

element.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        if(state.recipes.servings > 1) {
            state.recipes.updateServings('dec')
            RecipeView.updateServingsIngredients(state.recipes)
        }
      
    } 
    else if(e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipes.updateServings('inc')
        RecipeView.updateServingsIngredients(state.recipes)
    } else if(e.target.matches('.recipe__btn__add, .recipe__btn__add *')) {
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }

    

   
})




