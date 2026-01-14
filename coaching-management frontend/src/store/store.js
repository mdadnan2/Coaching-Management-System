import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import LoginReducer from '../reducers/LoginSlice';


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, LoginReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)