const API_URL = 'http://localhost:3000/api';

// ============ SERVICES API ============
export async function getServices() {
  const res = await fetch(`${API_URL}/services`);
  return res.json();
}

export async function createService(service) {
  const res = await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service)
  });
  return res.json();
}

export async function updateService(id, service) {
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service)
  });
  return res.json();
}

export async function deleteService(id) {
  await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
}

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

// ============ NEWS API ============
export async function getNews() {
  const res = await fetch(`${API_URL}/news`);
  return res.json();
}

export async function createNews(news) {
  const formData = new FormData();
  formData.append('date', news.date);
  formData.append('category', news.category);
  formData.append('title', news.title);
  formData.append('description', news.description);
  if (news.thumbnail) {
    formData.append('thumbnail', news.thumbnail);
  }
  
  const res = await fetch(`${API_URL}/news`, {
    method: 'POST',
    body: formData
  });
  return res.json();
}

export async function updateNews(id, news) {
  const formData = new FormData();
  if (news.date) formData.append('date', news.date);
  if (news.category) formData.append('category', news.category);
  if (news.title) formData.append('title', news.title);
  if (news.description) formData.append('description', news.description);
  if (news.thumbnail) {
    formData.append('thumbnail', news.thumbnail);
  }
  
  const res = await fetch(`${API_URL}/news/${id}`, {
    method: 'PUT',
    body: formData
  });
  return res.json();
}

export async function deleteNewsAPI(id) {
  await fetch(`${API_URL}/news/${id}`, { method: 'DELETE' });
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

export async function deleteBlogAPI(id) {
  await fetch(`${API_URL}/blogs/${id}`, { method: 'DELETE' });
}
