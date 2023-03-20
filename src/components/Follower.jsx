import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function Follower({}){
    const [foll, setFoll] = useState([]);
    const userID = useParams();
    async function getFollower(id){
        console.log(id);
        const response = await fetch("http://localhost/SAE401/site/get-profil-follower.php",{
            method: 'GET',
            headers: {'userID': id}
        });
        const json = await response.json();
        setFoll(json);
    };
    useEffect(()=>{
        getFollower(userID.userID);
    },[]);
    return (
        <div className="follower-component">
            <div className="follower-component-head">
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
            <div className="follower-component-body">
                {foll.map((user)=>{
                    return (
                        
                        <div className="foll-user-div" key={user.user_id}>
                            <NavLink to={"/profil/"+user.user_id}>
                            <div className="foll-pp">
                                <div className="the-foll-pp">

                                </div>
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
export default Follower;