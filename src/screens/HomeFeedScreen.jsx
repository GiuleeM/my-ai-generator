import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import '../style.css';

function HomeFeedScreen() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  console.log(posts);
    useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(
        query(collection(db, 'art'), orderBy('createdAt', 'desc'))
      );
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push(doc.data());
      });
      setPosts(postsArray);
      setLoading(false);
    }
    getData();
   
  }, []);

  return (
    <div className="homeFeedContainer">
      {loading && <p className="loadingText">Loading..</p>}
      {posts.map((post) => (
        <div key={post.id} className="blurredContainer postContainer">
          <div className="postHeaderContainer">
            <p className="postTitle">"{post.title}"</p>
            <p className="createdAt">
              Created by {post.userDisplayName} at:{' '}
              {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
            </p>
          </div>

          <div className="imagesContainer">
            {post.images.map((image, imageIndex) => (
              <div key={imageIndex} className="imageItem">
                <img src={image.url} />
                <p>{image.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeFeedScreen;