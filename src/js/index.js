import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


/**  Global state of the app
 * - Search object
 * - Current recipe object
 * - Shoping list object
 * - Liked recipes
*/

const state = {};

const controlSearch = async () => {
    // 1. Get the query from the view 
    const query = searchView.getInput();

    if (query) {
        // 2. New search object and add it to state
        state.search = new Search(query);

        // 3. Prepare UI for the results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4. Search for the recipes
        await state.search.getResults();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});









