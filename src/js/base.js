

export const element = {
    searchInput: document.querySelector('.search__field'),
    searchResult: document.querySelector('.search'),
    resultList: document.querySelector('.results__list'),
    resultloader: document.querySelector('.results'),
    searchrespages: document.querySelector('.results__pages'),
    recipe:  document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
}
  


export const renderLoader = parent => {
    const loader = `
    <div class="loader">
    <svg>
        <use href="img/icons.svg#icon-cw"></use>
    </svg>
        </div>
    `;

    parent.insertAdjacentHTML("afterbegin", loader);
}

 export const clearloader = ()=> {
    const loader = document.querySelector('.loader');
    if (loader) 
        loader.parentElement.removeChild(loader);

   
}
