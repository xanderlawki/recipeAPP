import { element } from './base';

export const RenderItem = item => {
    const markup = `
    <li class="shopping__item" data-item=${item.id}>
    <div class="shopping__count">
        <input type="number" value="${item.amount}" step="${item.amount}" class="shopping__count-value">
        <p>${item.unit}</p>
    </div>
    <p class="shopping__description">${item.name}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
</li> 
    `
  element.shopping.insertAdjacentHTML('beforeend', markup)  
}

export const deleteLike = (id)=> {
    
    const item = document.querySelector(`[data-item=${id}]`);
    item.parentElement.removeChild(item);
}