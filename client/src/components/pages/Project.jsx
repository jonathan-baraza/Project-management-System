import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../Spinner";
import ClientInfo from "../ClientInfo";
import DeleteProjectButton from "../DeleteProjectButton";
import EditProjectForm from "../EditProjectForm";
function Project() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: id,
    },
  });

  useEffect(() => {
    console.log(data);
  }, [loading]);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to={"/"} className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Project status</h5>
          <p className="lead">{data.project.status}</p>
          <ClientInfo client={data.project.client} />
          <EditProjectForm project={data.project} />
          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}

export default Project;
