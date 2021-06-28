export function AddLinkFavoriteList(link) {
    return {
        type: 'ADD_LINK_TO_FAVORITE_LIST',
        payload: {
            link: link
        }
    }
}

export function changeFlag() {
    return {
        type: 'CHANGE_FLAG'        
    }
}