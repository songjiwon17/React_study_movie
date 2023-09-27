import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App(){
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState('createdAt');
    const [offset, setOffset] = useState(0); //offset
    const [hasNext, setHasNext] = useState(false); //hasNext

    const sortedItems = items.sort((a,b)=>b[order] - a[order]);
    const handleNewestClick = () => setOrder('createdAt');
    const handleBestClick = () => setOrder('rating');
    
    const handleDelete = (id)=>{ //id를 파라미터로 받아옴 //해당아이디를 가진 요소를 filter를 통해서 걸러낸다.
        const nextItems = items.filter((item)=>item.id !== id); //!== -> 같지 않으면 true 반환
        setItems(nextItems);
    }

    const handleLoad = async (options) => {
        const { reviews, paging } = await getReviews(options);
        if(options.offset === 0){
            setItems(reviews);
        }else{
            setItems([...items, ...reviews]);
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
            <button disabled={!hasNext} onClick={handleLoadMore}>더보기</button>
        </div>
    )
}
export default App;