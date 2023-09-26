function ReviewListItem({item}){
    return(
        <div className="ReviewListItem">
            <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title}/>
            <div>
                <h1>{item.title}</h1>
                <p>{item.rating}</p>
            </div>
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