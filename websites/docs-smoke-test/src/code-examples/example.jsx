const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com'
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com'
  }
];

function User({ user }) {
  return (
    <ul>
      <li>Name: {user.name}</li>
      <li>Email: {user.email}</li>
    </ul>
  );
}

function App() {
  return (
    <main>
      <h1>Users list</h1>
      <hr />
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </main>
  );
}
