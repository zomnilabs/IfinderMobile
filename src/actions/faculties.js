import { makeSyncLoop, isNotSync } from '../utils/itemSyncUtils';
import constFactory from '../factories/const.factory';

export const types = constFactory('faculty');

export const syncFaculties = () => {
    return (dispatch, getState) => {
        return dispatch(loadFaculties())
            .then(() => {
                const itemsToSync = getState().faculties.items.filter(isNotSync);
                return Promise.all(itemsToSync.map(item => dispatch(saveFaculty(item))));
            })
    }
};

export const startSyncLoop = makeSyncLoop(syncFaculties());

export const loadFaculties = options => {
    return {
        url: 'faculties',
        method: 'get',
        meta: {
            ...options
        },
        types: {
            start: types.LOAD_START,
            success: types.LOAD_SUCCESS,
            error: types.LOAD_ERROR,
            noConnection: types.LOAD_NO_CONNECTION
        }
    }
};

export const saveFaculty = faculty =>
    !faculty.id || faculty._isNew ?
        createFaculty(faculty) :
        updateFaculty(faculty);

export const updateFaculty = faculty => {
    return {
        url: `faculties/${faculty.id}`,
        method: 'put',
        body: faculty,
        types: {
            start: types.UPDATE_START,
            success: types.UPDATE_SUCCESS,
            noConnection: types.UPDATE_NO_CONNECTION,
            error: types.UPDATE_ERROR
        }
    }
};

export const createFaculty = faculty => {
    const id = faculty.id || Date.now().toString();
    return {
        url: 'faculties',
        method: 'post',
        body: {
            ...faculty,
            _isNew: true,
            id
        },
        meta: {
            id
        },
        types: {
            start: types.CREATE_START,
            success: types.CREATE_SUCCESS,
            noConnection: types.CREATE_NO_CONNECTION,
            error: types.CREATE_ERROR
        }
    };
};
