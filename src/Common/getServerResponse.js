import {store} from "./Store/configureStore";
import { runSaga } from "redux-saga";
import fetchData from "./Store/Sagas/SagaHelper";


export const getServerResponse = async (serverCommunication, queryParam = null, qparam = null,setIsLoading=null) => {
  if (!serverCommunication?.apiUrl) {
    console.error('Error',"No API URL provided");
    return;
  }
  try {
    
    const response = await runSaga(
      {
        dispatch: () => { }, // We don't need to dispatch
        getState: () => store.getState(), // Provide access to Redux state
      },
      fetchData,
      serverCommunication,
      queryParam,
      qparam
    ).toPromise();

    return response;
  } catch (error) {
    console.error("Error in Server Response:", error);
  } finally {
    setIsLoading && setIsLoading(false);
  }
};
