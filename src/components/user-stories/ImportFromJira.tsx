import React, { useState, useMemo } from 'react';
import { Button } from '@/ShadcnComponents/ui/button';
import { Input } from '@/ShadcnComponents/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ShadcnComponents/ui/card';

interface ProjectCard {
  id: string;
  title: string;
  code: string;
  storiesCount: number;
  lastUpdated: string;
  selected?: boolean;
}

interface JiraFormData {
  // jiraUrl: string;
  searchTerm: string;
  selectedProjectId: string | null;
}

interface ImportFromJiraProps {
  onSubmit?: (data: any) => void;
}

const ImportFromJira: React.FC<ImportFromJiraProps> = ({ onSubmit }) => {
  // Store all form data in a single JSON object
  const [formData, setFormData] = useState<JiraFormData>({
    // jiraUrl: 'https://mycompany.atlassian.net',
    searchTerm: '',
    selectedProjectId: null
  });

  const [projects, setProjects] = useState<ProjectCard[]>([
    {
      id: 'ec',
      title: 'E-Commerce Platform',
      code: 'ECOM',
      storiesCount: 45,
      lastUpdated: '2 days ago'
    },
    {
      id: 'mb',
      title: 'Mobile App Redesign',
      code: 'MAR',
      storiesCount: 32,
      lastUpdated: 'Today'
    },
    {
      id: 'cp',
      title: 'Customer Portal',
      code: 'CP',
      storiesCount: 28,
      lastUpdated: '5 days ago'
    },
    {
      id: 'ap',
      title: 'Admin Panel',
      code: 'AP',
      storiesCount: 19,
      lastUpdated: '1 week ago'
    }
  ]);

  const filteredProjects = useMemo(() => {
    if (!formData.searchTerm.trim()) return projects;

    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(formData.searchTerm.toLowerCase()) ||
        project.code.toLowerCase().includes(formData.searchTerm.toLowerCase())
    );
  }, [projects, formData.searchTerm]);

  const handleInputChange = (key: keyof JiraFormData, value: string) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  const handleSelectProject = (id: string) => {
    setProjects(
      projects.map((project) => ({
        ...project,
        selected: project.id === id
      }))
    );

    setFormData({
      ...formData,
      selectedProjectId: id
    });
  };

  const handleSubmit = () => {
    const selectedProject = projects.find((p) => p.id === formData.selectedProjectId);

    if (!formData.selectedProjectId) {
      alert({
        title: 'No project selected',
        description: 'Please select a project before submitting',
        variant: 'destructive'
      });
      return null;
    }

    const submissionData = {
      source: 'JIRA',
      // jiraUrl: formData.jiraUrl,
      project: selectedProject
    };

    // Show a alert notification
    alert({
      title: 'JIRA project submitted',
      description: `Processing project: ${selectedProject?.title}`
    });

    console.log('Submission data:', submissionData);

    if (onSubmit) {
      onSubmit(submissionData);
    }

    return submissionData;
  };

  return (
    <Card className="jira-import-card border shadow-sm">
      <CardHeader className="jira-import-header">
        <CardTitle className="jira-import-title text-xl font-semibold">Import from JIRA</CardTitle>
        <p className="jira-import-description text-gray-600 text-sm">
          Select a JIRA project to import user stories
        </p>
      </CardHeader>
      <CardContent className="jira-import-content space-y-6">
        {/* <div className="jira-url-container">
          <label
            htmlFor="jira-url"
            className="jira-url-label block text-sm font-medium text-gray-700 mb-1">
            JIRA Instance URL
          </label>
          <Input
            id="jira-url"
            value={formData.jiraUrl}
            onChange={(e) => handleInputChange('jiraUrl', e.target.value)}
            placeholder="https://yourcompany.atlassian.net"
            className="jira-url-input w-full"
          />
          <p className="jira-url-help text-xs text-gray-500 mt-1">
            Enter the URL of your JIRA instance
          </p>
        </div> */}

        <div className="projects-container">
          <div className="projects-header flex justify-between items-center mb-2">
            <label className="projects-label block text-sm font-medium text-gray-700">
              Filter Projects
            </label>
          </div>
          <Input
            value={formData.searchTerm}
            onChange={(e) => handleInputChange('searchTerm', e.target.value)}
            placeholder="Search projects..."
            className="projects-search-input w-full mb-4"
          />

          {filteredProjects.length > 0 ? (
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  className={`project-card border rounded-md p-4 cursor-pointer transition-all ${
                    project.id === formData.selectedProjectId
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:border-blue-200'
                  }`}>
                  <div className="project-card-header flex items-center justify-between mb-2">
                    <div className="project-id bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                      {project.id.toUpperCase()}
                    </div>
                    <div className="project-code text-xs text-gray-500">{project.code}</div>
                  </div>
                  <h4 className="project-title font-medium text-sm mb-2">{project.title}</h4>
                  <div className="project-meta flex justify-between text-xs text-gray-500">
                    <span className="project-stories-count">
                      {project.storiesCount} user stories
                    </span>
                    <span className="project-last-updated">
                      Last updated: {project.lastUpdated}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-projects-found bg-gray-50 rounded-md p-8 text-center">
              <p className="text-gray-500 font-medium">
                No projects found matching "{formData.searchTerm}"
              </p>
              <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="jira-import-footer flex justify-between">
        <Button variant="outline" className="jira-cancel-btn">
          Cancel
        </Button>
        <Button
          className="jira-import-btn"
          onClick={handleSubmit}
          disabled={!formData.selectedProjectId}>
          Import Selected Project
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImportFromJira;
