import { useLoaderData } from "react-router-dom";


const Users = () => {
    const users = useLoaderData()

    const handleDelete = id =>{
        console.log(id)
        fetch(`http://localhost:5000/users/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
           if(data.deletedCount>0){
            alert('successfully deleted')
           }else{
            alert('not deleted')
           }
        })
    }

    return (
        <div>
            <h2>Users here{users.length}</h2>
            {
                users.map(user => 
                <p key={user._id}>{user.name}{user.email}
                <button onClick={() =>handleDelete(user._id)}>X</button>
                </p>)
            }
        </div>
    );
};

export default Users;