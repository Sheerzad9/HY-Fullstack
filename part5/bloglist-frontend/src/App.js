import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogDescendingOrd = blogs.sort((a, b) => {
        if (a.likes === b.likes) return 0
        return a.likes > b.likes ? -1 : 1
      })
      setBlogs(sortedBlogDescendingOrd)
    })
    if (user) blogService.setToken(user.token)
  }, [user, notification])

  useEffect(() => {
    const existingUser = window.localStorage.getItem('loggedInUser')
    if (existingUser) {
      setUser(JSON.parse(existingUser))
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  const blogCreatedSuccessfully = () => {
    blogFormRef.current.changeVisibility()
  }

  if (!user) {
    return (
      <>
        <Notification notification={notification}></Notification>
        <Login setUser={setUser} setNotification={setNotification}></Login>
      </>
    )
  }

  return (
    <div>
      <div style={{ width: '100%' }}>
        <button
          onClick={handleLogout}
          style={{ color: 'red', right: 0, position: 'fixed' }}
        >
          Log out
        </button>
      </div>
      <Notification notification={notification}></Notification>
      <div>
        <h2 style={{ color: 'green' }}>{user.name} is logged in</h2>
        <h2>blogs</h2>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <CreateBlogForm
            setNotification={setNotification}
            onBlogCreatedSuccessfully={blogCreatedSuccessfully}
          ></CreateBlogForm>
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} setNotification={setNotification} />
        ))}
      </div>
    </div>
  )
}

export default App
