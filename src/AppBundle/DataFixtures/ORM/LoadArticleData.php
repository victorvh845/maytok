<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use AppBundle\Entity\Article;
use AppBundle\Entity\Category;

class LoadArticleData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    private $container;

    public function getOrder()
    {
        return 30;
    }

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {        
        $categories = $manager->getRepository('AppBundle:Category')->findAll();

        foreach ($categories as $category) {
            for ($i = 1; $i <= 10; ++$i) {
                $article = new Article();
                $article->setName($this->getNombre());
                $article->setSlug('angry-'.$i . '-' . $category->getSlug());
                $article->setContent($this->getDescripcion());
                $article->setCategory($category);
                $article->setImage('http://img11.deviantart.net/d98f/i/2015/350/7/f/20151216_by_dtjun-d9kbw3f.jpg');
                $manager->persist($article);
                $manager->flush();
            }
        }        
    }

    /**
     * Generador aleatorio de nombres de articulos.
     *
     * @return string Nombre/título aletorio generado para el articulo.
     */
    private function getNombre()
    {
        $palabras = array_flip(array(
            'Lorem', 'Ipsum', 'Sitamet', 'Et', 'At', 'Sed', 'Aut', 'Vel', 'Ut',
            'Dum', 'Tincidunt', 'Facilisis', 'Nulla', 'Scelerisque', 'Blandit',
            'Ligula', 'Eget', 'Drerit', 'Malesuada', 'Enimsit', 'Libero',
            'Penatibus', 'Imperdiet', 'Pendisse', 'Vulputae', 'Natoque',
            'Aliquam', 'Dapibus', 'Lacinia',
        ));
        $numeroPalabras = rand(2, 3);

        return implode(' ', array_rand($palabras, $numeroPalabras));
    }

    /**
     * Generador aleatorio de descripciones de ofertas.
     *
     * @return string Descripción aletoria generada para la oferta.
     */
    private function getDescripcion()
    {
        $frases = array_flip(array(
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
            '<p>Mauris ultricies nunc nec sapien tincidunt facilisis.</p>',
            '<p>Nulla scelerisque blandit ligula eget hendrerit.</p>',
            '<p>Sed malesuada, enim sit amet ultricies semper, elit leo lacinia massa, in tempus nisl ipsum quis libero.</p>',
            '<p>Aliquam molestie neque non augue molestie bibendum.</p>',
            '<p>Pellentesque ultricies erat ac lorem pharetra vulputate.</p>',
            '<p>Donec dapibus blandit odio, in auctor turpis commodo ut.</p>',
            '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>',
            '<p>Nam rhoncus lorem sed libero hendrerit accumsan.</p>',
            '<p>Maecenas non erat eu justo rutrum condimentum.</p>',
            '<p>Suspendisse leo tortor, tempus in lacinia sit amet, varius eu urna.</p>',
            '<p>Phasellus eu leo tellus, et accumsan libero.</p>',
            '<p>Pellentesque fringilla ipsum nec justo tempus elementum.</p>',
            '<p>Aliquam dapibus metus aliquam ante lacinia blandit.</p>',
            '<p>Donec ornare lacus vitae dolor imperdiet vitae ultricies nibh congue.</p>',
        ));
        $numeroFrases = rand(10, 15);

        return implode("\n", array_rand($frases, $numeroFrases));
    }
}
