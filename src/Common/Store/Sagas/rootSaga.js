import { all } from 'redux-saga/effects';
import dataSaga from './general/generalSagas'

function * rootSaga() {
    yield all([
        dataSaga(),
    ])
}
export default rootSaga
