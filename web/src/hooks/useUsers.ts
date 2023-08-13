import { useQuery, useSubscription } from "@apollo/client";
import { UsersContext } from "contexts/UsersContext";
import * as queries from "graphql/queries";
import * as subscriptions from "graphql/subscriptions";
import useAuth from "hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function compareFullName(a: any, b: any) {let result = 0;
  if (a.fullName < b.fullName) {
      for (let i = 0; i < a.fullName.length; i++) {
          if (a.fullName[i] < b.fullName[i]) {
              result = -1;
              break;
          }
      }
  } else if (a.fullName > b.fullName) {
      for (let i = 0; i < a.fullName.length; i++) {
          if (a.fullName[i] > b.fullName[i]) {
              result = 1;
              break;
          }
      }
  }
  return result;
  
}

export function useUsersByWorkspace() {const { user } = useAuth();
const location = useLocation();
const workspaceId = location.pathname.split("/dashboard/workspaces/")[1]?.split("/")[0];

let usersList: any[] = [];
const [users, setUsers] = useState<any[]>(usersList);

const usersData = useQuery(queries.LIST_USERS, {
    skip: !user,
    fetchPolicy: "cache-and-network",
});

const usersPushData = useSubscription(subscriptions.USER, {
    skip: !user,
});

useEffect(() => {
    if (usersData.data) {
        usersList = usersData.data.listUsers;
        setUsers(usersList);
    }
}, [usersData.data]);

useEffect(() => {
    if (usersPushData.data) {
        const updatedUser = usersPushData.data.onUpdateUser;
        const filteredUsers = users.filter(
            (item) => item.objectId !== updatedUser.objectId
        );
        const newUsersList = [...filteredUsers, updatedUser];
        setUsers(newUsersList);
    }
}, [usersPushData.data]);

return {
    value: users
        .filter((u: any) => u.workspaces.includes(workspaceId))
        .sort(compareFullName),
    loading: usersData.loading,
};

}

export function useUserById(id?: string) {const { value } = useContext(UsersContext);
let userValue;
if (value) {
    for (let i = 0; i < value.length; i++) {
        if (value[i].objectId === id) {
            userValue = value[i];
            break;
        }
    }
}
return { value: userValue };

}
