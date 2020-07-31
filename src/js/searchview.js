import { element } from './base'

export const getSearchInput = (()=> element.searchInput.value);

export const clearInput = ()=> {
    element.searchInput.value = ""
}

export const clearResult = ()=> {
    element.resultList.innerHTML = "";
    element.searchrespages.innerHTML = "";
}

export const highlight = (id)=> {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => el.classList.remove('results__link--active'))
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

 export  const limitRecipe = (title, limit = 17)=> {
        if(title.length > limit) {
            const newtitle = [];
            title.split(' ').reduce((acc, cur)=> {
                 if (acc + cur.length <= limit) {
                    newtitle.push(cur);
                    
                }
                return acc + cur.length;
            },0)
            return `${newtitle.join(' ')}...`;
        }
        return title;
    }
const renderRecipe = (recipe)=> {
    const markup = `
    <li>
                    <a class="results__link" href="#${recipe.id}">
                        <figure class="results__fig">
                            <img src="https://spoonacular.com/recipeImages/${recipe.image}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipe(recipe.title)}</h4>
                        </div>
                    </a>
                </li>
    `
    element.resultList.insertAdjacentHTML("beforeend", markup);
}

const createButton = (page, type)=> `
        <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                </svg>  
        </button>

`

const renderButtons = (page, numresult, resperpage)=> {
    const pages = Math.ceil(numresult / resperpage);
    let button;
    if (page === 1 && pages > 1) {
       button =  createButton(page, 'next')
    }
    else if (page < pages ) {
       button = `
       ${createButton(page, 'next')}
       ${createButton(page, 'prev')}
       `
    }
    else if(page === pages && pages > 1) {
        button = createButton(page, 'prev')
    }

    element.searchrespages.insertAdjacentHTML("afterbegin", button);
}
export const renderResult = (recipes, page = 1, resperpage = 10)=> {
    const start = (page - 1) * resperpage;
    const end = page * resperpage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resperpage);
}







