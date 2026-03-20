const API_URL = 'http://localhost:3000/api';

// ============ TEAM API ============
export async function getTeam() {
  const res = await fetch(`${API_URL}/team`);
  return res.json();
}

export async function createTeamMember(member) {
  const formData = new FormData();
  formData.append('name', member.name);
  formData.append('role', member.role);
  formData.append('bio', member.bio);
  if (member.image) {
    formData.append('image', member.image);
  }

  const res = await fetch(`${API_URL}/team`, {
    method: 'POST',
    body: formData
  });
  return res.json();
}

export async function updateTeamMember(id, member) {
  const formData = new FormData();
  if (member.name) formData.append('name', member.name);
  if (member.role) formData.append('role', member.role);
  if (member.bio) formData.append('bio', member.bio);
  if (member.image) {
    formData.append('image', member.image);
  }

  const res = await fetch(`${API_URL}/team/${id}`, {
    method: 'PUT',
    body: formData
  });
  return res.json();
}

export async function deleteTeamMember(id) {
  await fetch(`${API_URL}/team/${id}`, { method: 'DELETE' });
}

// ============ BLOGS API ============
export async function getBlogs() {
  const res = await fetch(`${API_URL}/blogs`);
  return res.json();
}

export async function createBlog(blog) {
  const formData = new FormData();
  formData.append('date', blog.date);
  formData.append('category', blog.category);
  formData.append('title', blog.title);
  formData.append('subtitle', blog.subtitle || '');
  formData.append('author', blog.author || '');
  formData.append('issue', blog.issue || '');
  formData.append('description', blog.description);
  if (blog.thumbnail) {
    formData.append('thumbnail', blog.thumbnail);
  }

  const res = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    body: formData
  });
  return res.json();
}

export async function updateBlog(id, blog) {
  const formData = new FormData();
  if (blog.date) formData.append('date', blog.date);
  if (blog.category) formData.append('category', blog.category);
  if (blog.title) formData.append('title', blog.title);
  if (blog.hasOwnProperty('subtitle')) formData.append('subtitle', blog.subtitle || '');
  if (blog.hasOwnProperty('author')) formData.append('author', blog.author || '');
  if (blog.hasOwnProperty('issue')) formData.append('issue', blog.issue || '');
  if (blog.description) formData.append('description', blog.description);
  if (blog.thumbnail) {
    formData.append('thumbnail', blog.thumbnail);
  }

  const res = await fetch(`${API_URL}/blogs/${id}`, {
    method: 'PUT',
    body: formData
  });
  return res.json();
}

export async function deleteBlog(id) {
  await fetch(`${API_URL}/blogs/${id}`, { method: 'DELETE' });
}

export async function getBlogById(id) {
  const res = await fetch(`${API_URL}/blogs/${id}`);
  return res.json();
}

// ============ ENQUIRIES API ============
export async function getEnquiries() {
  const res = await fetch(`${API_URL}/enquiries`);
  return res.json();
}

export async function createEnquiry(enquiry) {
  const res = await fetch(`${API_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry)
  });
  return res.json();
}

export async function updateEnquiry(id, enquiry) {
  const res = await fetch(`${API_URL}/enquiries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiry)
  });
  return res.json();
}

export async function deleteEnquiry(id) {
  await fetch(`${API_URL}/enquiries/${id}`, { method: 'DELETE' });
}
