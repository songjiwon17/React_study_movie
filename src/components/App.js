import { createReview, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useEffect, useState, useCallback } from "react";
import useAsync from "./hooks/useAsync";
import LocaleContext from "../contexts/LocaleContext";

const LIMIT = 6;

function App(){
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState('createdAt');
    const [offset, setOffset] = useState(0); //offset
    const [hasNext, setHasNext] = useState(false); //hasNext
    const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

    const sortedItems = items.sort((a,b)=>b[order] - a[order]); //최신순으로 정렬하기

    const handleNewestClick = () => setOrder('createdAt');
    const handleBestClick = () => setOrder('rating');
    
    const handleDelete = async (id)=>{ //id를 파라미터로 받아옴 //해당아이디를 가진 요소를 filter를 통해서 걸러낸다.
        const result = await deleteReview(id);
        if(!result) return;

        setItems((prevItems)=> prevItems.filter((item)=>item.id !== id));
    }

    const handleLoad = useCallback (async (options) => {
        const result = await getReviewsAsync(options);
        if(!result) return;
        
        const { reviews, paging } = result;

        if(options.offset === 0){
            setItems(reviews);
        }else{
            setItems((prevItems)=>[...prevItems, ...reviews]);
        }
        setOffset(options.offset + reviews.length);
        setHasNext(paging.hasNext);
    }, [getReviewsAsync]);

    const handleLoadMore = ()=>{
        handleLoad({ order, offset, limit:LIMIT})
    }

    const handleCreateSuccess = (review)=>{
        setItems((prevItems)=> [review, ...prevItems]);
    }

    const handleUpdateSuccess = (review)=>{
        setItems((prevItems)=>{
            const splitIdx = prevItems.findIndex((item)=>item.id === review.id)
            return [...prevItems.slice(0, splitIdx), review, ...prevItems.slice(splitIdx + 1)]
        })
    }

    useEffect(()=>{
        handleLoad({order, offset:0, limit: LIMIT});
    },[order, handleLoad]);
    
    return (
        <LocaleContext.Provider value={'ko'}>
            <div>
                <div>
                    <button onClick={handleNewestClick}>최신순</button>
                    <button onClick={handleBestClick}>베스트순</button>
                </div>
                <ReviewForm onSubmit={createReview} onSubmitSuccess={handleCreateSuccess}/>
                <ReviewList items={sortedItems} onDelete={handleDelete} onUpdate={updateReview} onUpdateSuccess={handleUpdateSuccess}/>
                {hasNext && <button disabled={isLoading} onClick={handleLoadMore}>더보기</button>}
                {loadingError?.message && <span>{loadingError.message}</span>}
            </div>
        </LocaleContext.Provider>
    )
}
export default App;