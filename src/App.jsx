import { useEffect, useState } from 'react';
import "./style/app.css";
import Timeline from './pages/Timeline';
import Left from './components/Left.jsx';
import Right from './components/Right';
import { Routes, Route, useNavigate, useParams} from 'react-router-dom';
import Login from './pages/Login';
import Signin from './pages/Signin';
import TweetReply from './pages/TweetReply';
import Profil from './pages/Profil';
import ChatAuthor from './components/ChatAuthor';
import Chat from './components/Chat';
import TweetForm from './components/TweetForm';
import Follower from './components/Follower';
import Following from './components/Following';

function App() {
  //   State/Variable-------------------------------------------------------------------------------------
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [userTweet, setUsertweet] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [allTweets, setAlltweets] = useState([]);
  const [formReplyID, setFormReplyID] = useState();
  const [pseudo, setPseudo] = useState("");
  const [identifiant, setIdentifiant] = useState("@");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [tweetForm, setTweetForm] = useState(false);
  const navigate = useNavigate();
  //   Comportements-------------------------------------------------------------------------------------


useEffect(()=>{
  getAllTweet();
    if(token){
      getUser(token,(userInfo)=>{
        if(userInfo){
          setUser(userInfo);
        }else{
          console.log("Y'a une erreur");
        }
      } );
    }
    getTweet(token);
},[token]);

const handleMail = (event,callback)=>{
  console.log()
  var newValue = event.target.value;
  setMail(newValue);
  if(callback){
    callback(newValue);
  }
};
const handlePseudo = (event, callback)=>{
  var newValue = event.target.value;
  setPseudo(newValue);
  if(callback){
    callback(newValue);
  }
};
const handlePassword = (event, callback)=>{
  var newValue = event.target.value;
  setPassword(newValue);
  if(callback){
    callback(newValue);
  }
};
const handleIdentifiant = (event,callback)=>{
  var newValue = event.target.value;
  setIdentifiant(newValue);
  if(callback){
    callback(newValue);
  }
};
function getUser(token, callback){
  if(token){
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = () =>{
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if (httpRequest.status === 200) {
                var reponse = httpRequest.responseText;
                if(reponse === "token-invalid"){
                  window.localStorage.removeItem('token');
                  navigate("/");
                  window.location.reload();   
                }else{
                  reponse=JSON.parse(reponse);
                  reponse = reponse[0];
                  callback(reponse);
                }
              }else{
                  callback(null);
              }
          }
      };
      httpRequest.open('GET', 'http://localhost/SAE401/site/get-user.php', true);
      httpRequest.setRequestHeader("auth", token);
      httpRequest.send();
  }else{
    console.log("Le token Fourni n'est bon. Couilles pas fr.")
  }
}
async function register(mail,pseudo,identifiant,password){
  if(mail && pseudo && identifiant && password){
    if(identifiant.charAt(0) === "@"){
      const response = await fetch('http://localhost/SAE401/site/register.php', {
        method: 'POST',
        body: JSON.stringify({
          "mail":  mail, 
          "pseudo": pseudo, 
          "identifiant": identifiant, 
          "password": password
        })
      });
      const json = await response.json();
      if(json === 777){
        navigate("/login");
      }else if(json === 22){
        alert("Compte déjà Créer");
      }
    }else{
      console.log("L'identifiant n'est pas bon brow.")
    }
  }else{
    console.log("Il manque des truc la");
  }
}
function login(pseudo, password, callback){
  if(pseudo && password ){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () =>{
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var reponse = httpRequest.responseText;
                reponse = JSON.parse(reponse);
                if(reponse === 222){
                 callback("Vos informations de connexions ne sont pas reconnu.");
                  return;
                }
                var token = reponse.token;
                window.localStorage.setItem('token', token);
                var newUser = getUser(token, (userInfo)=>{
                    if(userInfo){
                      setUser(userInfo);
                    }else{
                      console.log("Y'a une erreur");
                    }
                });
                setUser(newUser);
                navigate("/");
                window.location.reload();
            }else{
                alert("Problème avec la requête");
            }
        }
    };
    httpRequest.open('POST', 'http://localhost/SAE401/site/login.php', true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({"pseudo": pseudo, "password": password});
    httpRequest.send(data);
  }else{
    if(callback){
      callback("Le pseudo et/ou le mot est/sont vide(s)");
    }
  }
}
function logout(){
    window.localStorage.removeItem("token");
    setUser({});
    navigate("/");
    window.location.reload();
}
function getAllTweet(){
  var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = ()=>{
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var reponse = httpRequest.responseText;
            reponse = JSON.parse(reponse);
            setAlltweets(reponse);
        }else{
            alert("Problème avec la requête");
        }
    }
    };
    httpRequest.open('GET', 'http://localhost/SAE401/site/get-all-tweet.php', true);
    httpRequest.send();
}
function getTweet(token){
  if(token){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = ()=>{
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var reponse = httpRequest.responseText;
            reponse = JSON.parse(reponse);
            setTweets(reponse);
        }else{
            alert("Problème avec la requête");
        }
    }
    };
    httpRequest.open('GET', 'http://localhost/SAE401/site/get-user-following-allTweet.php', true);
    httpRequest.setRequestHeader("auth", token);
    httpRequest.send();
  }else{
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = ()=>{
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var reponse = httpRequest.responseText;
            reponse = JSON.parse(reponse);
            setTweets(reponse);
            console.log(reponse);
        }else{
            alert("Problème avec la requête");
        }
    }
    };
    httpRequest.open('GET', 'http://localhost/SAE401/site/get-random-tweet.php', true);
    httpRequest.send();
  }
}
function getUserTweet(userID){
  if(userID){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = ()=>{
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var reponse = httpRequest.responseText;
            reponse = JSON.parse(reponse);
            setUsertweet(reponse);
        }else{
            alert("Problème avec la requête");
        }
    }
    };
    httpRequest.open('GET', 'http://localhost/SAE401/site/get-user-tweet.php', true);
    httpRequest.setRequestHeader("userID", userID);
    httpRequest.send();
  }else{
    console.log("Frérot le token est vide tu joues à quoi.");
  }
}
function handleReply(replied){
  navigate("/reply/"+replied);
}
async function postTweet(token,content,repliedID) {
  if(repliedID){
    const response = await fetch('http://localhost/SAE401/site/post-user-tweet.php',{
      method: 'POST',
      headers: {'auth': token},
      body: JSON.stringify({"content":  content, "replied": repliedID})
  });
  const json = await response.json();
  console.log(json);
  }else{
    var repliedID = "NULL";
    const response = await fetch('http://localhost/SAE401/site/post-user-tweet.php',{
      method: 'POST',
      headers: {'auth': token},
      body: JSON.stringify({"content":  content, "replied": repliedID})
  });
  const json = await response.json();
  console.log(json);
  };
}
async function getUserFollow(token,callback) {
  if(token){
    const response = await fetch('http://localhost/SAE401/site/get-user-follow.php', {
      method: 'GET',
      headers: {'auth': token},
    });
    const json = await response.json();
    callback(json);
  }else{
    console.log("Y'a pas de token brow");
  }
}
function tweetSpawn(tweetID){
  if(tweetForm === true){
    setTweetForm(false);
  }else if(tweetForm === false){
    setTweetForm(true);
  }

  if(typeof tweetID === "string"){
    setFormReplyID(tweetID);
  }
}

  //   Render-------------------------------------------------------------------------------------
  return (
    <>
      <Routes>
        <Route path='*' element={
        <>
            <Left token={token} user={user} logout={logout} tweetSpawn={tweetSpawn}/>
              <Routes>
                <Route path="/" element={<Timeline tweets={tweets} handleReply={handleReply}/>}/>
                <Route path="/reply/:tweetID" element={<TweetReply handleReply={handleReply} tweetSpawn={tweetSpawn}/>}/>
                <Route path='/profil/:userID' element={<Profil getUserTweet={getUserTweet} userTweet={userTweet} handleReply={handleReply} user={user} token={token} getUserFollow={getUserFollow}/>}/>
                <Route path='/profil/:userID/follower'element={<Follower token={token} />}/>
                <Route path='/profil/:userID/following' element={<Following token={token} />}/>
              </Routes>
            <Right token={token} user={user}/>
        </>
        }/>
        <Route path='/login' element={<Login pseudo={pseudo} password={password} handlePseudo={handlePseudo} handlePassword={handlePassword} login={login}/>}/>
        <Route path='/signin' element={<Signin identifiant={identifiant} pseudo={pseudo} password={password} mail={mail} handleMail={handleMail} handlePseudo={handlePseudo} handlePassword={handlePassword} handleIdentifiant={handleIdentifiant} register={register}/>}/>
        <Route path='/message/*' element={
          <>
            <Left token={token} user={user} logout={logout} tweetSpawn={tweetSpawn}/>
            <ChatAuthor token={token} user={user}/>
            <Routes>
              <Route path='/:mpID' element={<Chat token={token}/>}/>
            </Routes>
          </>
        }/>
      </Routes>
      {tweetForm ? (<TweetForm tweetSpawn={tweetSpawn} postTweet={postTweet} token={token} tweetID={formReplyID}/>) : undefined}
    </>
  );
}
export default App;
