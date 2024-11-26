import { useLoaderData } from "react-router-dom";


const Update = () => {
    const users = useLoaderData()
    console.log(users)

    const handleSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email)
        const updatedUser = {name, email}

        fetch(`http://localhost:5000/users/${users._id}`, {
            method: "PUT",
            headers:{
                "Content-type": "application/json"
            },
            body:JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.modifiedCount>0){
                alert('Successfully modified')
            }
        })
    }
    return (
        <div>
            <h2>{users.email}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" defaultValue={users?.name} id="" />
                <br />
                <input type="text" name="email" defaultValue={users?.email} id="" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Update;