// ── STATE ──────────────────────────────────────────────
let posts = [];
let postIdCounter = 1;
let selectedImageDataUrl = null;
 
// ── DOM REFS ───────────────────────────────────────────
const modal = document.getElementById('postModal');
const modalClose = document.getElementById('modalClose');
const modalPostBtn = document.getElementById('modalPostBtn');
const postTextArea = document.getElementById('postText');
const fileInput = document.getElementById('fileInput');
const imgPreviewWrap = document.getElementById('imgPreviewWrap');
const imgPreview = document.getElementById('imgPreview');
const imgRemove = document.getElementById('imgRemove');
const postsFeed = document.getElementById('postsFeed');
const emptyState = document.getElementById('emptyState');
 
// ── MODAL OPEN/CLOSE ───────────────────────────────────
function openModal(focusPhoto = false) {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    postTextArea.focus();
    if (focusPhoto) fileInput.click();
  }, 120);
}
 
function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}
 
document.getElementById('openModal').addEventListener('click', () => openModal());
document.getElementById('openModal').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(); });
document.getElementById('openModalPhoto').addEventListener('click', () => openModal(true));
document.getElementById('openModalVideo').addEventListener('click', () => openModal());
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
 
// ── POST BUTTON ENABLE/DISABLE ─────────────────────────
function updatePostBtn() {
  const hasText = postTextArea.value.trim().length > 0;
  const hasImage = selectedImageDataUrl !== null;
  modalPostBtn.disabled = !hasText && !hasImage;
}
 
postTextArea.addEventListener('input', updatePostBtn);
 
// ── IMAGE UPLOAD ───────────────────────────────────────
fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    selectedImageDataUrl = ev.target.result;
    imgPreview.src = selectedImageDataUrl;
    imgPreviewWrap.classList.add('has-image');
    updatePostBtn();
  };
  reader.readAsDataURL(file);
  fileInput.value = '';
});
 
imgRemove.addEventListener('click', () => {
  selectedImageDataUrl = null;
  imgPreview.src = '';
  imgPreviewWrap.classList.remove('has-image');
  updatePostBtn();
});
 
// ── SUBMIT POST ────────────────────────────────────────
modalPostBtn.addEventListener('click', submitPost);
postTextArea.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !modalPostBtn.disabled) submitPost();
});
 
function submitPost() {
  const text = postTextArea.value.trim();
  const image = selectedImageDataUrl;
  if (!text && !image) return;
 
  const post = {
    id: postIdCounter++,
    text,
    image,
    time: 'Just now · 🌍',
    likes: 0,
    liked: false,
    comments: [],
    showComments: false,
  };
  posts.unshift(post);
 
  // Reset modal
  postTextArea.value = '';
  selectedImageDataUrl = null;
  imgPreview.src = '';
  imgPreviewWrap.classList.remove('has-image');
  modalPostBtn.disabled = true;
  closeModal();
 
  renderFeed();
}
 
// ── RENDER FEED ────────────────────────────────────────
function renderFeed() {
  if (posts.length === 0) {
    postsFeed.innerHTML = '';
    postsFeed.appendChild(emptyStateEl());
    return;
  }
  postsFeed.innerHTML = '';
  posts.forEach(post => {
    postsFeed.appendChild(createPostEl(post));
  });
}
 
function emptyStateEl() {
  const d = document.createElement('div');
  d.className = 'no-posts';
  d.id = 'emptyState';
  d.innerHTML = `<div class="no-posts-icon">✍️</div>
    <div class="no-posts-text">No posts yet</div>
    <div class="no-posts-sub">Create your first post using the composer above!</div>`;
  return d;
}
 
function timeAgo() {
  return 'Just now · 🌍';
}
 
function createPostEl(post) {
  const el = document.createElement('div');
  el.className = 'post';
  el.dataset.postId = post.id;
 
  el.innerHTML = `
    <div class="post-header" style="display:flex;align-items:center;gap:12px;padding:16px 16px 10px;">
      <div class="post-avatar">MK</div>
      <div style="flex:1;min-width:0;">
        <div class="post-name">Mubashir Khan</div>
        <div class="post-date">${post.time}</div>
      </div>
      <button class="post-delete" data-id="${post.id}" title="Delete post" aria-label="Delete post">✕</button>
    </div>
    ${post.text ? `<div class="post-text">${escapeHtml(post.text).replace(/\n/g,'<br>')}</div>` : ''}
    ${post.image ? `<div class="post-img-wrap"><img src="${post.image}" alt="Post image" loading="lazy"></div>` : ''}
    <div class="post-stats">
      <div class="post-stats-likes" data-id="${post.id}">
        ${post.likes > 0 ? `<span>👍</span> <span>${post.likes} ${post.likes === 1 ? 'Like' : 'Likes'}</span>` : '<span style="color:var(--muted);font-size:13px;">Be the first to like this</span>'}
      </div>
      <div style="font-size:13px;color:var(--muted);cursor:pointer;" data-comment-toggle="${post.id}">
        ${post.comments.length > 0 ? `${post.comments.length} comment${post.comments.length > 1 ? 's' : ''}` : ''}
      </div>
    </div>
    <div class="post-actions">
      <button class="post-action ${post.liked ? 'liked' : ''}" data-like="${post.id}">
        👍 <span>${post.liked ? 'Liked' : 'Like'}</span>
      </button>
      <button class="post-action" data-comment-toggle="${post.id}">
        💬 <span>Comment</span>
      </button>
      <button class="post-action" data-share="${post.id}">
        ↗ <span>Share</span>
      </button>
    </div>
    ${renderCommentsSection(post)}
  `;
 
  // Bind events
  el.querySelector(`[data-id="${post.id}"].post-delete`).addEventListener('click', () => deletePost(post.id));
 
  el.querySelector(`[data-like="${post.id}"]`).addEventListener('click', () => toggleLike(post.id));
  el.querySelector(`.post-stats-likes[data-id="${post.id}"]`).addEventListener('click', () => toggleLike(post.id));
 
  el.querySelectorAll(`[data-comment-toggle="${post.id}"]`).forEach(btn => {
    btn.addEventListener('click', () => toggleComments(post.id));
  });
 
  const commentInput = el.querySelector(`[data-comment-input="${post.id}"]`);
  const commentSend = el.querySelector(`[data-comment-send="${post.id}"]`);
  if (commentInput && commentSend) {
    commentInput.addEventListener('input', () => {
      commentSend.style.opacity = commentInput.value.trim() ? '1' : '0.4';
    });
    commentInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addComment(post.id, commentInput.value); }
    });
    commentSend.addEventListener('click', () => addComment(post.id, commentInput.value));
  }
 
  return el;
}
 
function renderCommentsSection(post) {
  if (!post.showComments) return '';
  return `
    <div class="comments-section">
      ${post.comments.map(c => `
        <div class="comment-item">
          <div class="comment-avatar">MK</div>
          <div class="comment-bubble">
            <div class="comment-author">Mubashir Khan</div>
            <div class="comment-text">${escapeHtml(c.text).replace(/\n/g,'<br>')}</div>
            <div class="comment-time">${c.time}</div>
          </div>
        </div>
      `).join('')}
      <div class="comment-composer">
        <div class="comment-avatar">MK</div>
        <div class="comment-input-wrap">
          <textarea class="comment-input" data-comment-input="${post.id}" placeholder="Write a comment…" rows="1"></textarea>
          <button class="comment-send" data-comment-send="${post.id}" style="opacity:0.4;" aria-label="Send comment">➤</button>
        </div>
      </div>
    </div>
  `;
}
 
// ── ACTIONS ────────────────────────────────────────────
function deletePost(id) {
  const el = document.querySelector(`.post[data-post-id="${id}"]`);
  if (el) {
    el.style.transition = 'all 0.3s cubic-bezier(0.4,0,1,1)';
    el.style.opacity = '0';
    el.style.transform = 'scale(0.96) translateY(-8px)';
    el.style.maxHeight = el.offsetHeight + 'px';
    setTimeout(() => {
      el.style.maxHeight = '0';
      el.style.marginBottom = '0';
      el.style.padding = '0';
      el.style.overflow = 'hidden';
      setTimeout(() => {
        posts = posts.filter(p => p.id !== id);
        renderFeed();
      }, 280);
    }, 200);
  }
}
 
function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  // Update just the relevant parts without full re-render
  const el = document.querySelector(`.post[data-post-id="${id}"]`);
  if (!el) return;
  const likeBtn = el.querySelector(`[data-like="${id}"]`);
  const statsLikes = el.querySelector(`.post-stats-likes[data-id="${id}"]`);
  if (likeBtn) {
    likeBtn.className = `post-action ${post.liked ? 'liked' : ''}`;
    likeBtn.innerHTML = `👍 <span>${post.liked ? 'Liked' : 'Like'}</span>`;
    if (post.liked) {
      likeBtn.animate([{transform:'scale(1)'},{transform:'scale(1.25)'},{transform:'scale(1)'}], {duration:300,easing:'cubic-bezier(0.16,1,0.3,1)'});
    }
  }
  if (statsLikes) {
    statsLikes.innerHTML = post.likes > 0
      ? `<span>👍</span> <span>${post.likes} ${post.likes === 1 ? 'Like' : 'Likes'}</span>`
      : `<span style="color:var(--muted);font-size:13px;">Be the first to like this</span>`;
  }
}
 
function toggleComments(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.showComments = !post.showComments;
  // Replace just this post element
  const el = document.querySelector(`.post[data-post-id="${id}"]`);
  if (!el) return;
  const newEl = createPostEl(post);
  newEl.style.animation = 'none';
  el.replaceWith(newEl);
  if (post.showComments) {
    const input = newEl.querySelector(`[data-comment-input="${id}"]`);
    if (input) setTimeout(() => input.focus(), 80);
  }
}
 
function addComment(id, text) {
  const t = text.trim();
  if (!t) return;
  const post = posts.find(p => p.id === id);
  if (!post) return;
  post.comments.push({ text: t, time: 'Just now' });
  post.showComments = true;
  const el = document.querySelector(`.post[data-post-id="${id}"]`);
  if (!el) return;
  const newEl = createPostEl(post);
  newEl.style.animation = 'none';
  el.replaceWith(newEl);
  // Scroll to the new comment
  const section = newEl.querySelector('.comments-section');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
 
// ── HELPERS ────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
 
// ── NAV TABS ───────────────────────────────────────────
document.querySelectorAll('.nav-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
 
// ── CARD STAGGER ──────────────────────────────────────
document.querySelectorAll('.card').forEach((el, i) => {
  el.style.animationDelay = (i * 0.06) + 's';
});
 
// Init
renderFeed();