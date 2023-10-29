import { useState, useCallback } from "react";

function useAsync (asyncFunction){
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const wrappedFunction = useCallback (async (...args)=>{
        try {
            setError(null);
            setPending(true);
            return await asyncFunction(...args); //스프레드 문법 사용(wrappedFunction에서 받은 파라미터를 그대로 asynFunction에다가 전달해줄 수 있다. )
        }catch (error){
            setError(error);
            return;
        }finally{
            setPending(false);
        }
    },[asyncFunction]);

    return [pending, error, wrappedFunction];
}
export default useAsync;