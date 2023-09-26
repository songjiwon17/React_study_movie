function ReviewList({items}){
    console.log(items);
    return <ul>{items.map((items)=>{
        <li>{items.title}</li>
    })}</ul>
}
export default ReviewList;