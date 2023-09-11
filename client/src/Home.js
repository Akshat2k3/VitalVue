import Fetch from "./Fetch";

const Home = () => {
    const { data: users, isPending, error } = Fetch('/api/information');

    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { users && users.map(user => (
                <div key={user.id}>
                    ID: { user.id }, Name: { user.name }, Email: { user.email }, Comment: { user.comment }
                </div>
            ))}            
        </div>
     );
}
 
export default Home;