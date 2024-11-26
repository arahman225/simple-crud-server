import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const Users = () => {
    const loadedUsers = useLoaderData()
    const [users, setUsers] = useState(loadedUsers)

    const handleDelete = id => {
        console.log(id)
        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('successfully deleted');
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers)
                } else {
                    alert('not deleted')
                }
            })
    }

    return (
        <div>
            <h2>Users here {users?.length || 0}</h2>
            {
                users && users.length > 0 ? (
                    users.map(user => (
                        <p key={user._id}>
                            {user.name} {user.email} {user._id}
                            <Link to={`/update/${user._id}`}> <button>Update</button> </Link>
                            <button onClick={() => handleDelete(user._id)}>X</button>
                        </p>
                    ))
                ) : (
                    <div style={{ color: 'red' }}>Not user</div>
                )
            }
        </div>
    );
};

export default Users;