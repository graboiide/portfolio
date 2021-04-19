<?php

namespace App\Controller;

use App\Entity\Project;
use App\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProjectController extends AbstractController
{
    /**
     * @Route("/project", name="project")
     */
    public function index(ProjectRepository $repository): Response
    {
        return $this->render('project/index.html.twig', [
            'projects' => $repository->findAll(),
        ]);
    }
    /**
     *@Route ("/ajax/project/{id}",name="ajax_project")
     */
    public function ajaxProject(Project $project)
    {
        return $this->render('ajax/project_view.html.twig', [
            'project' => $project,
        ]);
    }
}
