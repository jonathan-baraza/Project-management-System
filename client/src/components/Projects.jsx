import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "./queries/projectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";
function Projects() {
  const { data, error, loading } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;

  if (error) return <p>Something went wrong</p>;
  return (
    <>
      {data.allProjects.length > 0 ? (
        <div className="row mt-4">
          {data.allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No projects</p>
      )}
    </>
  );
}

export default Projects;
