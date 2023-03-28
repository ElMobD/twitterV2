function Author({author, pp_link}){
    return (
        <div className="chat-author-div">
            <div className="author-left">
                {pp_link ? (<div className="author-chat-pp" style={{ backgroundImage: `url(${pp_link})` }}></div>)
                :(<div className="author-chat-pp" style={{ backgroundImage: `url(${"/src/ressources/logoEmpty.png"})` }}></div>)}
            </div>
            <div className="author-right">
                {author}
            </div>
        </div>
    );
}
export default Author;