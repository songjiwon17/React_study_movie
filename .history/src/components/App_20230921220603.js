import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

function App(){
    const [items, setItems] = useState([]); //

    const [order, setOrder] = useState('createdAt');
    const sortedItems = items.sort((a,b)=>b[order] - a[order]);

    const handleNewestClick = () => setOrder('createdAt');
    const handleBestClick = () => setOrder('rating');

    const handleDelete = (id)=>{ //id를 파라미터로 받아옴 //해당아이디를 가진 요소를 filter를 통해서 걸러낸다. 
        const nextItems = items.filter((item)=>item.id !== id); //!== -> 같지 않으면 true 반환
        setItems(nextItems);
    }

    const handleLoad = async (orderQuery) => {
        const { reviews } = await getReviews(orderQuery);
        setItems(reviews);
    };
    useEffect(()=>{
        handleLoad(order);
    },[order])
    
    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>베스트순</button>
            </div>
            <ReviewList items={sortedItems} onDelete={handleDelete}/>
        </div>
    )
}
export default App;