import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "./queries/clientQueries";
import { ADD_CLIENT } from "./mutations/clientMutations";
import { ADD_PROJECT } from "./mutations/projectMutations";
import { GET_PROJECTS } from "./queries/projectQueries";
import { FaList } from "react-icons/fa";
function AddProjectModal() {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      status,
      clientId,
    },
    update(cache, { data: { addProject } }) {
      const { allProjects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { allProjects: [...allProjects, addProject] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    addProject(name, description, status, clientId);
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };
  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              New Project
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">
                    Add New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        className="form-control"
                        id="name"
                        type="text"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className="form-control"
                        id="description"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        id="status"
                        className="form-select"
                        value={status}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="complete">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>

                      {data?.allClients?.length > 0 ? (
                        <select
                          id="clientId"
                          className="form-select"
                          onChange={(e) => {
                            setClientId(e.target.value);
                          }}
                        >
                          <option value={""}>Select client</option>
                          {data.allClients.map((client) => (
                            <option value={client.id} key={client.id}>
                              {client.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>No clients yet</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary ms-auto"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddProjectModal;
