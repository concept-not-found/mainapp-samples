
import {h, App} from 'mainapp'

const fakeApi = {
  nextPostId: 1,
  posts: {
  },
  async createPost(title, body) {
    const postId = fakeApi.nextPostId++
    fakeApi.posts[postId] = {
      title,
      body
    }
    return postId
  },
  async getPost(postId) {
    return fakeApi.posts[postId]
  }
}

const Header = {
  view({$global: {openHome, openNewPost}}) {
    return <div>
      <h1><a href="javascript:;" onclick={openHome}>Best blog site ever</a></h1>
      <button onclick={openNewPost}>New post</button>
    </div>
  }
}

const Home = {
  featuredPosts: {},
  addFeaturedPost({featuredPosts}, postId, title) {
    return {
      featuredPosts: {
        [postId]: title
      }
    }
  },
  view({$global: {openPost}, featuredPosts}) {
    return <div>
      <h2>Featured posts</h2>
      <ul>
        {Object.keys(featuredPosts).map((id) => <li><a href="javascript:;" onclick={() => openPost(id)}>{featuredPosts[id]}</a></li>)}
      </ul>
    </div>
  }
}

const Form = (...fields) => {
  const specification = {
    reset() {
      const update = {}
      fields.forEach((field) => update[field] = '')
      return update
    }
  }
  fields.forEach((field) => {
    specification[field] = ''
    specification[`update${field}`] = ({}, {target: {value}}) => {
      return {
        [field]: value
      }
    }
  })
  return specification
}

const NewPost = {
  ...Form('title', 'body'),
  view({$global: {createPost}, title, body, updatetitle, updatebody}) {
    return <div>
      <h2>New post</h2>
      <div>
        <label>
          Title
          <input type="text" value={title} onkeyup={updatetitle}/>
        </label>
      </div>
      <div>
        <label>
          Body
          <textarea value={body} onkeyup={updatebody}></textarea>
        </label>
      </div>
      <div>
        <button onclick={() => createPost(title, body)}>Publish</button>
      </div>
    </div>
  }
}

const Post = {
  title: '',
  body: '',
  async loadPost({}, title, body) {
    return {
      title,
      body
    }
  },
  view({title, body}) {
    return <div>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  }
}

App({
  page: 'home',
  Header,
  Home,
  NewPost,
  Post,
  openHome() {
    return {
      page: 'home'
    }
  },
  async createPost({Home, openPost}, title, body) {
    const postId = await fakeApi.createPost(title, body)
    await Home.addFeaturedPost(postId, title)
    return openPost(postId)
  },
  async openNewPost({NewPost}) {
    await NewPost.reset()
    return {
      page: 'new post'
    }
  },
  async openPost({Post}, postId) {
    const {title, body} = await fakeApi.getPost(postId)
    await Post.loadPost(title, body)
    return {
      page: 'post'
    }
  },
  view ({page, Header, Home, NewPost, Post}) {
    return <div>
      <Header />
      {page === 'home' && <Home />}
      {page === 'new post' && <NewPost />}
      {page === 'post' && <Post />}
    </div>
  }
}, document.getElementById('mainapp-entry'))
