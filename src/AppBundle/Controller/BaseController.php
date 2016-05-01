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

class BaseController extends Controller
{
    const LIMIT_POST = 24;

    /**
     * @Route("/blog/", name="app_blog")
     * @Method("GET")
     */
    public function blogAction()
    {
        $client = new Tumblr('hMf8ICpDo2klxkEgmNRgyAumRW87Mv6PxQ58pMiiuTo1CFj1vV');
        $posts = $client->getBlogPosts('khanmaytok.tumblr.com', array(
            'limit' => self::LIMIT_POST, 'tag' => 'maytok')
        );

        return $this->render('Static/blog.html.twig', array('posts' => $posts));
    }

    /**
     * @Route("/blog/page/{number}/", name="app_blog_pages", defaults={"number": 1}, requirements={"number": "\d+"})
     * @Method("GET")
     */
    public function blogPagesAction($number)
    {
        $client = new Tumblr('hMf8ICpDo2klxkEgmNRgyAumRW87Mv6PxQ58pMiiuTo1CFj1vV');
        $offset = ($number - 1) * self::LIMIT_POST;
        $posts = $client->getBlogPosts('khanmaytok.tumblr.com', array(
            'offset' => $offset, 'limit' => self::LIMIT_POST, 'tag' => 'maytok')
        );

        return $this->render('Static/blog.html.twig', array('posts' => $posts));
    }

    /**
     * @Route("/blog/post/{id}/{slug}/", name="app_blog_post", requirements={"id": "\d+"})
     * @Method("GET")
     */
    public function blogPostAction($id)
    {
        $client = new Tumblr('hMf8ICpDo2klxkEgmNRgyAumRW87Mv6PxQ58pMiiuTo1CFj1vV');
        $posts = $client->getBlogPosts('khanmaytok.tumblr.com', array('id' => $id));

        return $this->render('Blog/blog-post.html.twig', array('post' => $posts->posts[0]));
    }

    /**
     * @Route("/wiki/", name="app_wiki")
     * @Method("GET")
     * @return Response
     */
    public function wikiAction()
    {

        $categories = $this->getDoctrine()
                ->getRepository('AppBundle:Category')
                ->findAll();

        $articles = $this->getDoctrine()
                ->getRepository('AppBundle:Article')
                ->findAll();

        if (!$categories || !$articles) {
            throw $this->createNotFoundException(
                'No existen resultados'
            );
        }
        return $this->render('Static/wiki.html.twig', array('categories' => $categories, 'articles' => $articles));
    }

    /**
     * @Route("/wiki/category/find-articles", name="find_articles_wiki")
     * @Method("GET")
     * @return Response
     */
    public function findArticlesByCategoryAction(Request $request)
    {
        $category = $request->query->get('category');
        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT a, c FROM AppBundle:Article a
                        JOIN a.category c
                        WHERE c.slug = :category'
        )->setParameter('category', $category);

        $articles = $query->getArrayResult();

        if (!$articles) {
            throw $this->createNotFoundException(
                'No existen artículos'
            );
        }
        return $this->render('Fragments/listaCategorias.html.twig', array('articles' => $articles));
    }

    /**
     * @Route("/wiki/{slug}/", name="wiki_articulo")
     * @Method("GET")
     *
     * @param $slug
     *
     * @return Response
     */
    public function wikiArticuloAction($slug)
    {

        $article = $this->getDoctrine()
                ->getRepository('AppBundle:Article')
                ->findOneBySlug($slug);

        if (!$article) {
            throw $this->createNotFoundException(
                'No se encuentra este artículo'
            );
        }
        return $this->render('Wiki/article.html.twig', array('article' => $article));
    }

    /**
     * @Route("/upload-image/", name="upload_image")
     * @Method("POST")
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function uploadImageAction(Request $request)
    {
        $file = $request->files->get('files')[0];
        $fileName = md5(uniqid());
        $uploadDir = $this->container->getParameter('kernel.root_dir').'/../web/uploads';
        $file = $file->move($uploadDir, $fileName);

        $url = "https://api.imgur.com/3/image.json";
        $client_id = $this->container->getParameter('imgur_id');
        $image = file_get_contents($uploadDir . "/" . $fileName);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Authorization: Client-ID ' . $client_id ));
        curl_setopt($ch, CURLOPT_POSTFIELDS, array( 'image' => base64_encode($image) ));
        
        $imageUploaded = curl_exec($ch);

        curl_close($ch);
        
        $response = new JsonResponse();
        $response->setData(array(
            'files' => array(
                '0' => array(
                    'name' => $imageUploaded->data->id,
                    'size' => $imageUploaded->data->size,
                    'type' => $imageUploaded->data->type,
                    'name' => $imageUploaded->data->id,
                    'url' => $imageUploaded->data->link
                    )
                )
        ));

        return $response;
    }

    /**
     * @Route("/libro/{slug}/{number}/", name="capitulo_page")
     * @Method("GET")
     */
    public function capituloAction($slug, $number)
    {
        $book = $this->getDoctrine()
                ->getRepository('AppBundle:Book')
                ->findOneBySlug($slug);

        if (!$book) {
            throw $this->createNotFoundException(
                'Libro no encontrado'
            );
        }

        $repository = $this->getDoctrine()
            ->getRepository('AppBundle:Chapter');

        $chapter = $repository->findOneBy(
            array('book' => $book->getId(), 'number' => $number)
        );

        if (!$chapter) {
            throw $this->createNotFoundException(
                'Capítulo no encontrado'
            );
        }

        return $this->render('Reader/capitulo.html.twig', array(
            'chapter' => $chapter, 'book' => $book, )
        );
    }

    /**
     * @Method("GET")
     *
     * @return Response
     */
    public function getCategoriesAction()
    {
        $categorias = $this->getDoctrine()
            ->getRepository('AppBundle:Categoria')
            ->findAll();

        return $this->render('Fragments/listaCategorias.html.twig', array(
            'categorias' => $categorias,
        ));
    }

    /**
     * @Route("/custom/article/ajax-content", name="set_ajax_article_content")
     * @Method("POST")
     */
    public function setAjaxArticleContentAction(Request $request)
    {
        $id = $request->request->get('id');
        $content = $request->request->get('content');

        $article = $this->getDoctrine()
            ->getRepository('AppBundle:Article')
            ->findOneById($id);

        if (!$article) {
            throw $this->createNotFoundException(
                'Artículo no encontrado'
            );
        }

        $article->setContent($content);
        $em = $this->getDoctrine()->getManager();
        $em->persist($article);
        $em->flush();

        $response = new JsonResponse();
        return $response;
    }
}
