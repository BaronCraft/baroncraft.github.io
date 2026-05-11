import './Profile.css';

export default function Profile() {
  const user = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Software developer | Tech enthusiast | Coffee lover ☕',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    joinDate: 'January 2024',
    followers: 1234,
    following: 567,
    posts: 89
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header card">
          <div className="cover-photo"></div>
          <div className="profile-info">
            <div className="profile-avatar-large">👤</div>
            <div className="profile-details">
              <h1>{user.name}</h1>
              <span className="profile-username">{user.username}</span>
              <p className="profile-bio">{user.bio}</p>
              <div className="profile-meta">
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {user.location}
                </span>
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  {user.website}
                </span>
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Joined {user.joinDate}
                </span>
              </div>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{user.posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-value">{user.followers.toLocaleString()}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">{user.following.toLocaleString()}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-secondary">Settings</button>
          </div>
        </div>

        <div className="profile-tabs">
          <button className="tab-btn active">Posts</button>
          <button className="tab-btn">Media</button>
          <button className="tab-btn">Likes</button>
        </div>

        <div className="profile-content">
          <div className="empty-state card">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            <h3>No posts yet</h3>
            <p>When you create posts, they will appear here</p>
            <button className="btn btn-primary">Create Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
