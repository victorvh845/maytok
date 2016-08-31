<?php

namespace AppBundle\Controller;

use GuzzleHttp\Client as Guzzle;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Tumblr\API\Client as Tumblr;

/**
 * @Route("/api")
 */
class ApiController extends Controller
{
    const LIMIT_POST = 24;

    /**
     * @Route("/book", name="api_books")
     * @Method("GET")
     */
    public function listBooksAction()
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT b.title, b.cover, COUNT(b.id) as chapters
            FROM AppBundle:Book b LEFT JOIN AppBundle:Chapter c WITH b.id = c.book
            GROUP BY b.id'
        );

        $books = $query->getArrayResult();

        $response = new JsonResponse($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * @Route("/chapter/{book_id}", name="api_chapters")
     * @Method("GET")
     */
    public function listChaptersAction($book_id)
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT c.id, c.title, c.number, c.datePublish 
            FROM AppBundle:Chapter c WHERE c.book = :bookId'
        )->setParameters(array('bookId' => $book_id));

        $chapters = $query->getArrayResult();

        $response = new JsonResponse($chapters);
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}
