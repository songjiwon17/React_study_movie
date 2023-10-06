import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App(){
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState('createdAt');
    const [offset, setOffset] = useState(0); //offset
    const [hasNext, setHasNext] = useState(false); //hasNext
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);

    const sortedItems = items.sort((a,b)=>b[order] - a[order]);
    const handleNewestClick = () => setOrder('createdAt');
    const handleBestClick = () => setOrder('rating');
    
    const handleDelete = (id)=>{ //id를 파라미터로 받아옴 //해당아이디를 가진 요소를 filter를 통해서 걸러낸다.
        const nextItems = items.filter((item)=>item.id !== id); //!== -> 같지 않으면 true 반환
        setItems(nextItems);
    }

    const handleLoad = async (options) => {
        let result;
        try{
            setIsLoading(true);
            setLoadingError(null);
            result = await getReviews(options);
        }catch(error){
            setLoadingError(error);
            return;
        }finally{
            setIsLoading(false);
        }
        const { reviews, paging } = result;
        if(options.offset === 0){
            setItems(reviews);
        }else{
            setItems((prevItems)=>[...prevItems, ...reviews]);
        }
        setOffset(options.offset + reviews.length);
        setHasNext(paging.hasNext);
    };

    const handleLoadMore = ()=>{
        handleLoad({ order, offset, limit:LIMIT})
    }

    useEffect(()=>{
        handleLoad({order, offset:0, limit: LIMIT});
    },[order])
    
    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>베스트순</button>
            </div>
            <ReviewList items={sortedItems} onDelete={handleDelete}/>
            {hasNext && <button disabled={isLoading} onClick={handleLoadMore}>더보기</button>}
            {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
    )
}
export default App;