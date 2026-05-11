import { useState } from 'react';
import './Feed.css';

const mockPosts = [
  {
    id: 1,
    author: { name: 'John Doe', avatar: '👨‍💼', username: '@johndoe' },
    content: 'Just launched my new project! 🚀 Check it out and let me know what you think!',
    image: null,
    likes: 42,
    comments: 12,
    timestamp: '2h ago',
    liked: false
  },
  {
    id: 2,
    author: { name: 'Jane Smith', avatar: '👩‍🎨', username: '@janesmith' },
    content: 'Beautiful sunset today! Nature is amazing 🌅',
    image: 'https://picsum.photos/600/400?random=1',
    likes: 128,
    comments: 34,
    timestamp: '4h ago',
    liked: true
  },
  {
    id: 3,
    author: { name: 'Tech News', avatar: '📰', username: '@technews' },
    content: 'Breaking: New AI breakthrough announced today. This could change everything we know about machine learning!',
    image: null,
    likes: 256,
    comments: 89,
    timestamp: '6h ago',
    liked: false
  }
];

export default function Feed() {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      author: { name: 'You', avatar: '👤', username: '@you' },
      content: newPost,
      image: null,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      liked: false
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="feed">
      <div className="feed-container">
        <div className="create-post card">
          <textarea
            className="post-input"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows="3"
          />
          <div className="post-actions">
            <button className="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
              Photo
            </button>
            <button className="btn btn-primary" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>

        <div className="posts">
          {posts.map(post => (
            <article key={post.id} className="post card fade-in">
              <div className="post-header">
                <div className="avatar">{post.author.avatar}</div>
                <div className="post-author">
                  <span className="author-name">{post.author.name}</span>
                  <span className="author-username">{post.author.username} · {post.timestamp}</span>
                </div>
              </div>
              
              <p className="post-content">{post.content}</p>
              
              {post.image && (
                <img src={post.image} alt="Post content" className="post-image" />
              )}
              
              <div className="post-stats">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>
              
              <div className="post-actions-bar">
                <button 
                  className={`action-btn ${post.liked ? 'liked' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={post.liked ? 'var(--error)' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  Like
                </button>
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Comment
                </button>
                <button className="action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  Share
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
