import UserFinder from './components/UserFinder';
import UserContext from './store/user-context';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

function App() {
  return (
    <UserContext.Provider value={{ users: DUMMY_USERS }}>
      <UserFinder />
    </UserContext.Provider>
  );
}

export default App;
