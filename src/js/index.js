import Search from './models/Search';

/**  Global state of the app
 * - Search object
 * - Current recipe object
 * - Shoping list object
 * - Liked recipes
*/

const state = {};

const controlSearch = async () => {
    // 1. Get the query from the view 
    const query = 'pizza'; // Do it later

    if (query) {
        // 2. New search object and add it to state
        state.search = new Search(query);

        // 3. Prepare UI for the results

        // 4. Search for the recipes
        await state.search.getResults();

        // 5. Render results on UI
        console.log(state.search.results);
    }
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});









