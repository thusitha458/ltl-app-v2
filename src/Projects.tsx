import { Col, Row } from "antd";
import React, { FC } from "react";
import ProjectCard, { Project } from "./ProjectCard";

interface ProjectsProps {
  projects: Project[];
}

const Projects: FC<ProjectsProps> = ({ projects }) => {
  return (
    <Row gutter={[12, 12]} style={{ maxWidth: 1800 }}>
    {
      projects.map((project: any) => (
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
          <ProjectCard
            key={project.ct}
            project={project}
          />
        </Col>
      ))
    }
    </Row>
  );
};

export default Projects;