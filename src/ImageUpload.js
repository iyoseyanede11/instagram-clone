import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import {db, storage} from './firbase'
import firebase from "firebase"
import './ImageUpload.css'

function ImageUpload({username}) {
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress)
            },
            (error) => {
                alert(error.message)
            },
            () => {
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption,
                        imageUrl: url,
                        username
                    })

                    setProgress(0);
                    setCaption('');
                    setImage(null)
                })
            }
        )
    }
    return (
        <div className="imageupload">
            <progress className="imageUpload__progress" value={progress} max="100" />
           <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Enter a caption..."/> 
           <input type="file" onChange={handleChange}/> 
           <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
