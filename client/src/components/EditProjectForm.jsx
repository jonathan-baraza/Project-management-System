import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "./queries/projectQueries";
import { UPDATE_PROJECT } from "./mutations/projectMutations";

function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status,
    },
    refetchQueries: [{ query: GET_PROJECT }],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateProject(name, description, status);
  };
  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProjectForm;
