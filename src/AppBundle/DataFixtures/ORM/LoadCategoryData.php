<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Category;
use AppBundle\Util\Util;

class LoadCategoryData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $dado = rand(10, 30);

        for ($i = 0; $i < $dado; ++$i) {
            $category = new Category();
            $category->setName($this->getCategory());
            $category->setSlug(Util::slugify($category->getName()) . Util::random_string(4));
            $category->setImage('http://orig03.deviantart.net/a42f/f/2015/270/1/6/the_car_1_2_by_arsenyer-d97i712.gif');
            $manager->persist($category);
            $manager->flush();
        }
    }

    /**
     * Generador aleatorio de categorías.
     *
     * @return string Nombre/título aletorio
     */
    private function getCategory()
    {
        $palabras = array(
            'Lorem', 'Ipsum', 'Sitamet', 'Et', 'At', 'Sed', 'Aut', 'Vel', 'Ut',
            'Dum', 'Tincidunt', 'Facilisis', 'Nulla', 'Scelerisque', 'Blandit',
            'Ligula', 'Eget', 'Drerit', 'Malesuada', 'Enimsit', 'Libero',
            'Penatibus', 'Imperdiet', 'Pendisse', 'Vulputae', 'Natoque',
            'Aliquam', 'Dapibus', 'Lacinia',
        );
        $category = $palabras[array_rand($palabras, 1)];

        return $category;
    }
}
