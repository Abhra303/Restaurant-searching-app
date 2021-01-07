import  Restaurents  from "./Restaurents";

function Wrapper(props){
    return (
        <div className="wrapper">
            <button className='seeall'>SEE ALL</button>
            <Restaurents resultList={props.resultList} />
        </div>
    );
}

export default Wrapper;
