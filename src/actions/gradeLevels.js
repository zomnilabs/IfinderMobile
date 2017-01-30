import { makeSyncLoop, isNotSync } from '../utils/itemSyncUtils';
import constFactory from '../factories/const.factory';

export const types = constFactory('grade_level');

export const syncGradeLevels = () => {
    return (dispatch, getState) => {
        return dispatch(loadGradeLevels())
            .then(() => {
                const itemsToSync = getState().buildings.items.filter(isNotSync);
                return Promise.all(itemsToSync.map(item => dispatch(saveGradeLevel(item))));
            })
    }
};

export const startSyncLoop = makeSyncLoop(syncGradeLevels());

export const loadGradeLevels = options => {
    return {
        url: 'grade-levels',
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

export const saveGradeLevel = building =>
    !building.id || building._isNew ?
        createGradeLevel(building) :
        updateGradeLevel(building);

export const updateGradeLevel = building => {
    return {
        url: `grade-levels/${building.id}`,
        method: 'put',
        body: building,
        types: {
            start: types.UPDATE_START,
            success: types.UPDATE_SUCCESS,
            noConnection: types.UPDATE_NO_CONNECTION,
            error: types.UPDATE_ERROR
        }
    }
};

export const createGradeLevel = building => {
    const id = building.id || Date.now().toString();
    return {
        url: 'grade-levels',
        method: 'post',
        body: {
            ...building,
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