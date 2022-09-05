import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "./queries/projectQueries";
import { DELETE_PROJECT } from "./mutations/projectMutations";
import { useMutation } from "@apollo/client";

function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id: projectId,
    },
    onCompleted: () => {
      navigate("/");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    // update(cache, { data: { deleteProject } }) {
    //   const { allProjects } = cache.readQuery({ query: GET_PROJECTS });
    //   cache.writeQuery({
    //     query: GET_PROJECTS,
    //     data: {
    //       allProjects: allProjects.filter(
    //         (project) => project.id !== deleteProject.id
    //       ),
    //     },
    //   });
    // },
  });
  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" />
        Delete project
      </button>
    </div>
  );
}

export default DeleteProjectButton;
