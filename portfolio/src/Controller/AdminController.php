<?php

namespace App\Controller;

use App\Entity\Picture;
use App\Entity\Project;
use App\Entity\Tech;
use App\Form\ProjectType;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(): Response
    {
        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }

    /**
     *@Route ("/admin/delete/project/{id}" , name="admin_delete_project")
     *@IsGranted("ROLE_ADMIN")
     */
    public function deleteProject(Project $project, EntityManagerInterface $manager){
        $manager->remove($project);
        $manager->flush();
        return $this->redirectToRoute("index");
    }

    /**
     * @Route("/admin/project/{id}", name="admin_project",defaults={"id"=null})
     * @IsGranted("ROLE_ADMIN")
     */
    public function project(Request $request,EntityManagerInterface $em,Project $project = null): Response
    {




        if(is_null($project))
            $project = new Project();

        $techs = $project->getTechnologies()->toArray();
        $form = $this->createForm(ProjectType::class,$project);

        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){

            foreach ($project->getPictures() as $picture){
                $picture->setProject($project);
                $em->persist($picture);
            }
            /** @var Tech $tech */
            foreach ($techs as $tech){
                $tech->removeProject($project);
            }

            foreach ($project->getTechnologies() as $tech){
                $tech->addProject($project);
            }
            $em->persist($project);
            $em->flush();
            $this->redirectToRoute("index");


        }
        return $this->render('admin/project.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     *@Route ("/admin/mail",name="Admin_mail")
     */
    public function mail(Request $request)
    {
        return new Response('OK');
    }

}
