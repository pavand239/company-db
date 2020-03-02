import  { useState, useEffect, useMemo } from "react";

export const useGetData = (getData) => {
    const initialState = useMemo(() => ({
        data:null,
        isLoading:true,
        error:null
    }),[]);
    const [dataState, setDataState] = useState(initialState);
    const onLoaded = (data) => setDataState({
                                                data,
                                                isLoading:false,
                                                error:null
                                            });
    const onError = (err) => setDataState({
                                            data:null,
                                            isLoading:false,
                                            error:err
                                        });
    useEffect(() => {
        setDataState(initialState);
        let cancelled = false;
        getData()
                .then(data => !cancelled && onLoaded(data))
                .catch(err => !cancelled && onError(err));
        return () => cancelled=true;
    },[getData, initialState])
    return dataState;
}