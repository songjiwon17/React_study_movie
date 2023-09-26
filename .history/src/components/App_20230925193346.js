import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App(){
    const [items, setItems] = useState([]); //
    const [order, setOrder] = useState('createdAt');
    const [option, setOption] = useState(0);

    const sortedItems = items.sort((a,b)=>b[order] - a[order]);
    const handleNewestClick = () => setOrder('createdAt');
    const handleBestClick = () => setOrder('rating');
    
    const handleDelete = (id)=>{ //id를 파라미터로 받아옴 //해당아이디를 가진 요소를 filter를 통해서 걸러낸다. 
        const nextItems = items.filter((item)=>item.id !== id); //!== -> 같지 않으면 true 반환
        setItems(nextItems);
    }

    const handleLoad = async (options) => {
        const { reviews } = await getReviews(options);
        setItems(reviews);
    };
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
        </div>
    )
}
export default App;