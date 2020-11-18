import React , {useState, useEffect}from 'react'
import './post.css'
import Avatar from '@material-ui/core/Avatar';
import {db, auth} from './firbase'
import firebase from "firebase"

function Post({postId, user,username, imageUrl, caption}) {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db.collection("posts").doc(postId).collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc)=> ({comment: doc.data(), id: doc.id})))
            })
        }
        return () => {
            unsubscribe();
        }
      }, [postId])
      const postComment = (event) => {
        event.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            comments: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
      }
    return (
        <div className="post">
            <div className="post__header">
                <Avatar alt={username} src="/static/images/avatar/1.jpg" className="post__avatar" />
                <h3>{username}</h3>
            </div>
           <img className="post__image" src={imageUrl} alt=""/> 
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>
            <div className="post__comments">
                {
                    comments.map(({comment, id}) => (
                    <p key={id}><strong>{comment.username}</strong> {comment.comments}</p>
                    ))
                }
            </div>
            {user &&
            <form className="post__commentBox">
                <input type="text" placeholder="Add a comment..." className="post__input" value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button className="post__button" disabled={!comment} type="submit" onClick={postComment}>Post</button>
            </form>
            }
        </div>
    )
}

export default Post
