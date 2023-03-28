import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Following(){
    const [foll, setFoll] = useState([]);
    const userID = useParams();
    async function getFollowing(id){
        console.log(id);
        const response = await fetch("http://localhost/SAE401/site/get-profil-following.php",{
            method: 'GET',
            headers: {'userID': id}
        });
        const json = await response.json();
        setFoll(json);
    };
    useEffect(()=>{
        getFollowing(userID.userID);
    },[]);
    return (
        <div className="following-component">
            <div className="following-component-head">
                <NavLink to={"/profil/"+userID.userID+"/follower"}>
                    <div className="nav-follower">
                        Follower
                    </div>
                </NavLink>
                <NavLink to={"/profil/"+userID.userID+"/following"}>
                    <div className="nav-following">
                        Following
                    </div>
                </NavLink>
            </div>
            <div className="following-component-body">
                {foll.map((user)=>{
                    return (
                        
                        <div className="foll-user-div" key={user.user_id}>
                            <NavLink to={"/profil/"+user.user_id}>
                            <div className="foll-pp">
                            {user.pp_link ? (<div className="the-foll-pp" style={{ backgroundImage: `url(${user.pp_link})` }}></div>):
                                (<div className="the-foll-pp" style={{ backgroundImage: `url(${"/src/ressources/logoEmpty.png"})` }}></div>)}
                            </div>
                            <div className="foll-center">
                                {user.pseudo}
                            </div>
                            </NavLink>
                            <div className="foll-isfollow">

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Following;