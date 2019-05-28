import { elements } from './base';
import Fraction from 'fraction.js';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};


const formatCount = (count) => {
    if (count) {
    const num = new Fraction(count).simplify(0.00001);
    return num.toFraction(true);
    }
    return '?';
   };
// const formatCount = count => {
//     if (count) {
//         // count --> 2 1/2
//         const [int, dec] = count.toString().split('.').map(el => parseInt(el));
        
//         if (!dec) return count;
 
//         if (int === 0) {
//             let fr = new Fraction(count);
//             fr = fixFraction(fr);
//             return `${fr.numerator}/${fr.denominator}`;
//         } else {
//             let fr = new Fraction(count - int);
//             fr = fixFraction(fr);
//             return `${int} ${fr.numerator}/${fr.denominator}`;
//         }
//     }
//     return '?';
// };

// const fixFraction = fr => {
 
//     // First check if we have a fraction that needs fixing
//     // The is one that has an unnaturally large denominator
//     // Since Fraction apparently does not "round" it might be more than 10
//     if (fr.denominator > 20) {
//         // We got this strange fraction by doing a division when
//         // we converted to a decimal
//         // So now we do the reverse division to get that number back
//         // for 33333/100000 do 100000/33333, which will return 3.00003...
//         // for 66667/100000 do 100000/6667, which will return  1,49999...
//         const reverseNum = fr.denominator/fr.numerator;
        
//         // reverseNum now is the denominator, assuming the numerator is 1
//         // So we are close, but of course not exact
//         // Also we might still have a decimal number
//         // Lets fix the rounding first
 
//         // We want to keep one decimal
//         // So first multiply reverseNum by 10
//         // So we get 30.0003 and 14.9999
//         const reverseX10 = reverseNum * 10;
 
//         // Now round this to the nearest integer
//         //So 30.0003 -> 30, and 14.9999 -> 15
//         const reverseIntX10 = Math.round(reverseX10);
 
//         // And divide by 10 again, which leaves 3 and 1.5
//         // So not really an int. Should have chosen another name
//         const reverseInt = reverseIntX10/10;
 
//         // Now we have nice rounded denominators with zero or one decimal
//         // But we do not want any decimals at all, 
//         // so we must multiply both denominator and numerator by the same number
 
//         // First we find the decimal and turn into an int by multiplying by 10.
//         // So (3%3)*10=0, (1,5%1)*10 = 5
//         // We must round the result, since JS sometimes gets it slightly wrong
//         // (Or we could go via a string)
//         const decimal = Math.round((reverseInt % Math.floor(reverseInt)) * 10);
//         let multiplier = 1;
 
//         // Then we know the smallest multplier for each
//         // For 1, 3, 7 and 9 we must multiply by 10
//         // For 2, 4, 6 and 8 we must munltiply by 5
//         // For 5 we multiply by 4
//         // For 0 no multiplication is needed
//         if ([1,3,7,9].find(el => el === decimal)) {
//             multiplier = 10;
//         } else if ([2,4,6,8].find(el => el === decimal)) {
//             multiplier = 5;
//         } else if (decimal === 5) {
//             multiplier = 4;
//         } else if (decimal === 0) {
//             multiplier = 1;
//         }
 
//         let fixedFraction = new Fraction();
//         // The numerator was 1, so simply set it to the multiplier
//         fixedFraction.numerator = multiplier;
//         // The rounded denominator was reverseInt, so we multiply it
//         fixedFraction.denominator = reverseInt * multiplier
 
//         return fixedFraction;
//     } else {
//         // No fix needed
//         return fr;
//     }
// }; 

const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
    const markup = `
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
        </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join(' ')}
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsIngredients = recipe => {
    // Update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // Update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
};
