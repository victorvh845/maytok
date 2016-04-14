<?php

namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Book;

class LoadBookData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        for ($i = 1; $i <= 20; ++$i) {
            $book = new Book();
            $book->setTitle($this->getNombre());
            $book->setAuthor($this->getNombre());
            $book->setEdition(1);
            $book->setLanguage('ES');
            $book->setPublicationDate(new \DateTime('2015-12-18'));
            $book->setCover('http://img11.deviantart.net/d98f/i/2015/350/7/f/20151216_by_dtjun-d9kbw3f.jpg');
            $book->setSlug('book-'.$i);
            $manager->persist($book);
            $manager->flush();
        }
    }

    /**
     * Generador aleatorio de nombres.
     *
     * @return string Nombre/título aletorio
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
        $numeroPalabras = rand(4, 8);

        return implode(' ', array_rand($palabras, $numeroPalabras));
    }
}
