function ReviewListItem({item}){
    return(
        <div className="ReviewListItem">
            <img className="ReviewListItem-img" src={items, imgUrl}/>
        </div>
    )
}


function ReviewList({items}){
    console.log(items);
    return (
        <ul>
        {items.map((items)=>{
        return <li>{items.title}</li>
        })}
        </ul>
    );
}
export default ReviewList;