let initialState = {
    link: '111111',
    flag: 'true'
}
let newState;

function reducer(state = initialState, action) {

    switch (action.type) {
        case 'ADD_LINK_TO_FAVORITE_LIST':
            console.log(action.payload);
            newState = { ...state };
            newState.link = action.payload.link;
            console.log('222222', newState);
            state = newState;
            return newState;
        case 'CHANGE_FLAG':
            newState = { ...state }
            newState.flag = 'false'
            return newState
        default:
            console.log('5555')

            return state;
    }
}
export default reducer;

// Сейчас редакс не работает так как 
// при переходе со страницы mainPage(глвная страница с поиском фильмов) 
// на страницу ListPage(страница со списком избранных фильмов) состояние редакса при таком
// переходе обнуляется. В итоге нам в Favorites после запроса fetch к API 
// приходит id списка фильмов. Этот id надо отправить в редакс(он отправляется и сохраняется в редакс)
// и потом из редакса взять и вставить в url fetch запроса на странице ListPage.
// Получается мы запоминаем id списка фильмов в редакс на favorites и потом 
// открываем новую страницу ListPage,  происходит перезагрузка страницы и редакс обнуляется.
//  Клиентский роутинг не должен перегружать страницу, но он перегружает.
// Сейчас я беру id списка фильмов из  URL. Но редакс прикручен правильно и работает корректно
// Это видно на кнопке которая меняет состояние flag  в редьюсере.
//  Пример с редаксом рабочий и его можно испольовать.

