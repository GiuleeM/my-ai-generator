import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import '../style.css';
import { generateImagePrompts, generateImage } from '../utils/utils';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function GenerateScreen() {
  const { currentUser } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTitles, setGeneratedTitles] = useState([]);
  const [images, setImages] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const saveImagesToFirestore = async (imageUrls, titles) => {
    const images = imageUrls.map((url, index) => ({
      url,
      title: titles[index],
    }));
    const artCollectionRef = collection(db, 'art');
    await addDoc(artCollectionRef, {
      title: inputValue,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      userDisplayName: currentUser.displayName,
      images,
    });
  };

  const handleButtonClick = async () => {
    setIsLoading(true);

    const titles = await generateImagePrompts(inputValue);
    setGeneratedTitles(titles);

    const imageUrls = await Promise.all(
      titles.map((title) => generateImage(title))
    );

    saveImagesToFirestore(imageUrls, titles);

    setImages(imageUrls);

    setInputValue('');
    setIsLoading(false);
  };

  if (!currentUser) return <Navigate to="/" />;

  return (
    <>
      <h1 className="firstTitle">My AI Image Generator</h1>
      <h2 className="secondTitle">
      Transforming text into visual art with ChatGPT & DALL-E
      </h2>
      <div className="inputContainer">
        <input
          className="inputClass"
          type="text"
          placeholder="What are you thinking at?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="buttonClass generateButton"
          disabled={isLoading || !inputValue}
          onClick={handleButtonClick}
        >
          {isLoading ? 'Loading...' : 'Generate AI Images'}
        </button>
      </div>

      {!isLoading && (
        <div id="imageContainer">
          {generatedTitles.map((title, index) => (
            <div key={index}>
              <h3>{title}</h3>
              <img src={images[index]} alt={title} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default GenerateScreen;