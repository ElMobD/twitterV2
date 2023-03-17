function Author({author}){
    return (
        <div className="chat-author-div">
            <div className="author-left">
                <div className="author-chat-pp">

                </div>
            </div>
            <div className="author-right">
                {author}
            </div>
        </div>
    );
}
export default Author;