import { makeSyncLoop, isNotSync } from '../utils/itemSyncUtils';
import constFactory from '../factories/const.factory';

export const types = constFactory('building');

export const syncBuildings = () => {
    return (dispatch, getState) => {
        return dispatch(loadBuildings())
            .then(() => {
                const itemsToSync = getState().buildings.items.filter(isNotSync);
                return Promise.all(itemsToSync.map(item => dispatch(saveBuilding(item))));
            })
    }
};

export const startSyncLoop = makeSyncLoop(syncBuildings());

export const loadBuildings = options => {
    return {
        url: 'buildings',
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

export const saveBuilding = building =>
    !building.id || building._isNew ?
        createBuilding(building) :
        updateBuilding(building);

export const updateBuilding = building => {
    return {
        url: `buildings/${building.id}`,
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

export const createBuilding = building => {
    const id = building.id || Date.now().toString();
    return {
        url: 'buildings',
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