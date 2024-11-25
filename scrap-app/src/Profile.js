import React from 'react';
import './Profile.css';

export default function Profile(){
    const userName = "Bobajolina";
    const userBio = "I like rats and frogs. This is my bio. Here's some more text to fill up the space. Lorem ipsum dolor sit amet. I don't know the rest of the saying.";
    const placeholderPages = Array.from({ length: 20 }, (_, index) => index + 1);

    return (
        <div className="profile-container">
        {/* Profile Header */}
        <header className="profile-header">
            {/* Placeholder pfp, will be replaced with emoji of user's choice*/}
          <div className="profile-picture">🦈</div>
          <div className="profile-info">
            <h1 className="profile-name">{userName}</h1>
            <p className="profile-bio">{userBio}</p>
          </div>
        </header>
  
        {/* Scrapbook Pages Grid */}
        <div className="scrapbook-grid">
          {placeholderPages.map((page) => (
            <div key={page} className="scrapbook-item">
                {/* Placeholder image, will be replaced with user's scrapbook pages (image thumbnails + link to the actual page) */}
              <div className="placeholder-image">📄</div>
            </div>
          ))}
        </div>
      </div>
    );
}