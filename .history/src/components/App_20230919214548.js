import ReviewList from "./ReviewList";
import items from "../mock.json";
import { useState } from "react";

function App(){
    const [order, setOrder] = useState('');
    const sortedItems = items.sort((a,b)=>b.rating - a.rating);
    return (
        <div>
            <ReviewList items={sortedItems}/>
        </div>
    )
}
export default App;