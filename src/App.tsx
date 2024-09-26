import { UsersAdapter } from "./adapters/users"
import Users from "./components/UsersList"
import { User } from "./types/users"

function App() {
  const usersAdapter = new UsersAdapter<User>()
  return (
    <div className="container mb-4">
      <Users adapter={usersAdapter}/>
    </div>
  )
}

export default App
