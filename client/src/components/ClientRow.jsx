import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "./queries/clientQueries";
import { DELETE_CLIENT } from "./mutations/clientMutations";
import { GET_PROJECTS } from "./queries/projectQueries";
function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {
      id: client.id,
    },
    //Refetching the query
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { allClients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       allClients: allClients.filter(
    //         (client) => client.id !== deleteClient.id
    //       ),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          <FaTrash onClick={deleteClient} />
        </button>
      </td>
    </tr>
  );
}

export default ClientRow;
