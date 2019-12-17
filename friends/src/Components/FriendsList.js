import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../Utils/axiosWithAuth";

const FriendsList = (props) => {
    const [friendsState, setFriendsState] = useState(
        {
            friends: [],
            newFriend: {
                id: "",
                name: "",
                age: "",
                email: "",
            },
            busy: false,
        }
    );

    useEffect(() => {
        axiosWithAuth()
            .get("/friends")
            .then((response) => {
                // console.log("FRIENDS GET RESPONSE IS: ", response);
                setFriendsState((currentState) => ({
                    ...currentState,
                    friends: [...currentState.friends, ...response.data],
                }));
                // console.log("FRIENDS STATE AFTER REQUEST: ", currentState);
            })
            .catch((error) => {
                console.log("FRIENDS GET ERROR: ", error);
            });
    }, []);

    // console.log("STATE IS NOW ", friendsState);

    const handleChanges = (event) => {
        setFriendsState({
            ...friendsState,
            newFriend: {
                ...friendsState.newFriend,
                [event.target.name]: event.target.value,
            },
        });
        // console.log("STATE.CREDENTIALS IS NOW ", loginState.credentials);
    };

    const postFriend = event => {
        event.preventDefault();
        setFriendsState({
            ...friendsState,
            busy: true,
        })
        axiosWithAuth().post("/friends", {
            ...friendsState.newFriend,
            id: ((friendsState.friends[friendsState.friends.length - 1].id) + 1),
        })
            .then((response) => {
                // console.log("FRIEND POST RESPONSE: ", response);
                setFriendsState((currentState) => ({
                    ...currentState,
                    friends: response.data,
                    newFriend: {
                        id: "",
                        name: "",
                        age: "",
                        email: "",
                    },
                    busy: false,
                }));
            })
            .catch((error) => {
                // console.log("FRIEND POST ERROR: ", error);
                setFriendsState((currentState) => ({
                    ...currentState,
                    newFriend: {
                        id: "",
                        name: "",
                        age: "",
                        email: "",
                    },
                    busy: false,
                }));
            })
    }

    return (
        <div>
            <h2>Add new friends with this form!</h2>
            <form onSubmit={postFriend}>
                <input
                    type="text"
                    name="name"
                    value={friendsState.newFriend.name}
                    onChange={handleChanges}
                    placeholder="John Doe"
                />
                <input
                    type="text"
                    name="age"
                    value={friendsState.newFriend.age}
                    onChange={handleChanges}
                    placeholder="25"
                />
                <input
                    type="text"
                    name="email"
                    value={friendsState.newFriend.email}
                    onChange={handleChanges}
                    placeholder="JohnDoe@domain.com"
                />
                <button>{friendsState.busy ? "Adding Friend" : "Add Friend"}</button>
            </form>
            <h2>Your Friends: </h2>
            <div>
                {friendsState.friends.map((friend) => {
                    return (
                        <div key={friend.id}>
                            <h3>Name: {friend.name}</h3>
                            <p>Age: {friend.age}</p>
                            <p>Email: {friend.email}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );

}

export default FriendsList;