<?php

namespace App\Form;

use App\Entity\Project;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProjectType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description',null,['attr'=>['rows'=>'10']])
            ->add('url')
            ->add('cover')
            ->add('caption',TextType::class,['attr'=>['rows'=>'1']])
            ->add('date',DateType::class,['html5'=>true,'widget'=>'single_text'])
            ->add('technologies')
            ->add('pictures',CollectionType::class,
                [
                    'entry_type'=>PictureType::class,
                    'allow_add'=>true,
                    'allow_delete'=>true
                ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Project::class,
        ]);
    }
}
