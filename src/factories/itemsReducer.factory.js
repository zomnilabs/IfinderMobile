import { setSyncStatus, mergeItems } from '../utils/itemSyncUtils';
import { addOrReplaceItem, replaceById, removeById, itemComparator } from '../utils/itemUtils';

export default function itemsReducerFactory(types) {
    return function itemsReducer(itemsState = [], action) {
        switch (action.type) {
            /** LIST LOAD **/
            case types.LOAD_SUCCESS:
                console.log('payload', action.payload);
                return mergeItems(itemsState, action.payload)
                    .sort(itemComparator);

            /** ITEM START **/
            case types.CREATE_START:
                return addOrReplaceItem(itemsState, {
                    ...action.payload,
                    _status: setSyncStatus(action)
                });

            /** ITEM SET ITEM & STATUSES: START & NO_CONNECTION & ERROR **/
            case types.UPDATE_START:
            case types.DELETE_START:
            case types.CREATE_NO_CONNECTION:
            case types.UPDATE_NO_CONNECTION:
            case types.DELETE_NO_CONNECTION:
            case types.CREATE_ERROR:
            case types.UPDATE_ERROR:
                return replaceById(itemsState, {
                    ...action.payload,
                    _status: setSyncStatus(action)
                });

            /** ITEM SUCCESS **/
            case types.CREATE_SUCCESS:
                return replaceById(itemsState, action.payload, action.meta.id);
            case types.UPDATE_SUCCESS:
            case types.DELETE_SUCCESS:
                return replaceById(itemsState, action.payload);

            /** ITEM DELETE ERROR **/
            case types.DELETE_ERROR:
                return replaceById(itemsState, {
                    ...action.payload,
                    isDeleted: false,
                    _status: setSyncStatus(action)
                });

            /** NOT SYNCED ITEM DELETE **/
            case types.DELETE_NEW:
                return removeById(itemsState, action.payload.id);

            default:
                console.log('type', action.type);
                return itemsState;
        }
    }
}

export const getActiveItems = (itemsState = []) => itemsState.filter(item => !item.isDeleted);