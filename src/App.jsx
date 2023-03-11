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

function App() {
  //   State/Variable-------------------------------------------------------------------------------------
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [userTweet, setUsertweet] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [allTweets, setAlltweets] = useState([]);
  const [details, setDetails] = useState([{pseudo:"",content:""}]);
  const [pseudo, setPseudo] = useState("");
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

const handleMail = (event)=>{
  var newValue = event.target.value;
  setMail(newValue);
};
const handlePseudo = (event)=>{
  var newValue = event.target.value;
  setPseudo(newValue);
};
const handlePassword = (event)=>{
  var newValue = event.target.value;
  setPassword(newValue);
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
function login(pseudo, password){
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () =>{
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
              var reponse = httpRequest.responseText;
              reponse = JSON.parse(reponse);
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
  var tweetReply = allTweets.filter((tweet) => tweet.tweet_id === replied);
  setDetails(tweetReply);
  navigate("/reply/"+replied);
}
async function postTweet(token,content,repliedID) {
  if(repliedID && token){
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
  }
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
function tweetSpawn(){
  console.log("ffd");
  if(tweetForm === true){
    setTweetForm(false);
  }else if(tweetForm === false){
    setTweetForm(true);
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
                <Route path="/reply/:tweetID" element={<TweetReply token={token} details={details} allTweets={allTweets} handleReply={handleReply} postTweet={postTweet}/>}/>
                <Route path='/profil/:userID' element={<Profil getUserTweet={getUserTweet} userTweet={userTweet} handleReply={handleReply} user={user} token={token} getUserFollow={getUserFollow}/>}/>
              </Routes>
            <Right token={token} user={user}/>
        </>
        }/>
        <Route path='/login' element={<Login pseudo={pseudo} password={password} handlePseudo={handlePseudo} handlePassword={handlePassword} login={login}/>}/>
        <Route path='/signin' element={<Signin/>}/>
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
      {tweetForm ? (<TweetForm tweetSpawn={tweetSpawn} postTweet={postTweet} token={token}/>) : undefined}
    </>
  );
}
export default App;
