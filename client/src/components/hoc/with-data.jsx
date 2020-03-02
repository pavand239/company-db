import React, { useCallback } from "react";
import ErrorIndicator from "../error-indicator";
import LoadingIndicator from "../loading-indicator";
import { useGetData } from "../hooks";

export const withData = (Wrapped) => {
    return (props) => {
        const useGetList = () => {
            let getList = useCallback(()=>props.getData(),[]);
            return useGetData(getList);
        }
        let {isLoading, isError, data} = useGetList();
        if (isLoading && !isError) {
            return <LoadingIndicator />;
        }
        if (isError) {
            return <ErrorIndicator />
        }
        return <Wrapped {...props} data={data} />
    }
}
