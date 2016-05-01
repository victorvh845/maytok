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
            'SELECT b FROM AppBundle:Book b'
        );

        $books = $query->getArrayResult();

        $response = new JsonResponse($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}
