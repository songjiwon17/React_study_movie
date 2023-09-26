import ReviewList from "./ReviewList";
import mockItems from "../mock.json";
import { useState } from "react";

function App(){
    const [items, setItems] = useState(mockItems); //

    const [order, setOrder] = useState('createdAt');
    const sortedItems = items.sort((a,b)=>b[order] - a[order]);

    const handleNewestClick = () => setOrder('createdAt');

    const handleBestClick = () => setOrder('rating');

    const handleDelete = (id)=>{ //id를 파라미터로 받아옴 //해당아이디를 가진 요소를 filter를 통해서 걸러내고 
        const nextItems = items.filter((items)=>items.id !== id);
    }

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>베스트순</button>
            </div>
            <ReviewList items={sortedItems}/>
        </div>   
    )
}
export default App;