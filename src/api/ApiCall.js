import axios from 'axios';
const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

//=========================================================
// Request API Call Using Axios
//=========================================================

export const getPosts = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: baseUrl,
    });
    return res.data;
  } catch (error) {
    console.log('Error in getPosts', error);
  }
};

export const addPost = async data => {
  try {
    const res = await axios({
      method: 'POST',
      url: baseUrl,
      data,
    });
    return res.data;
  } catch (error) {
    console.log('Error in addPost', error);
  }
};

export const updatePost = async (id, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${baseUrl}/${id}`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log('Error in updatePost', error);
  }
};

export const patchPost = async (id, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${baseUrl}/${id}`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log('Error in patchPost', error);
  }
};

export const deletePost = async id => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${baseUrl}/${id}`,
    });
    return res.data;
  } catch (error) {
    console.log('Error in deletePost', error);
  }
};

//  useEffect(() => {
//    getData();
//  }, []);

//  const getData = async () => {
//    let data = {
//      title: 'Hello',
//      userId: 1,
//      body: 'Please Say that',
//    };
// await deletePost(1)
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
// await updatePost(1, data);
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
// await patchPost(1, data)
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
// await addPost(data)
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
// await getPosts()
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
//};

//=========================================================
// Request API Call Using Fetch
//=========================================================

export const getPostsFetch = async () => {
  try {
    const res = await fetch(baseUrl);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const addPostFetch = async data => {
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updatePostFetch = async (id, data) => {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const patchPostFetch = async (id, data) => {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deletePostFetch = async id => {
  try {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// const getPostFetch = async () => {
//   const data = {
//     title: 'Hello World',
//     userId: 5,
//   };
// await deletePostFetch(1)
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
// await patchPostFetch(1, data)
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
// await updatePostFetch(1, data)
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
// await addPostFetch(data)
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
// await getPostsFetch()
//   .then(res => {
//     console.log('res', res);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
//};

export const fetchWithPagination = async (
  url,
  page,
  pageSize,
  options = {},
) => {
  try {
    const response = await fetch(
      `${url}?_page=${page}&_limit=${pageSize}`,
      options,
    );

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.status = response.status;
      error.statusText = response.statusText;
      error.body = await response.json();
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};
