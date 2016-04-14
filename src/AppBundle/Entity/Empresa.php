<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PadronRuc
 *
 * @ORM\Table(name="empresa")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\EmpresaRepository")
 */
class Empresa
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="ruc", type="string", length=11, unique=true)
     */
    private $ruc;

    /**
     * @var string
     *
     * @ORM\Column(name="razon_social", type="string", length=500)
     */
    private $razonSocial;

    /**
     * @var string
     *
     * @ORM\Column(name="estado", type="string", length=255)
     */
    private $estado;

    /**
     * @var string
     *
     * @ORM\Column(name="condicion_domicilio", type="string", length=255)
     */
    private $condicionDomicilio;

    /**
     * @var string
     *
     * @ORM\Column(name="ubigeo", type="string", length=255)
     */
    private $ubigeo;    

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set razonSocial
     *
     * @param string $razonSocial
     * @return Empresa
     */
    public function setRazonSocial($razonSocial)
    {
        $this->razonSocial = $razonSocial;

        return $this;
    }

    /**
     * Get razonSocial
     *
     * @return string 
     */
    public function getRazonSocial()
    {
        return $this->razonSocial;
    }

    /**
     * Set estado
     *
     * @param string $estado
     * @return Empresa
     */
    public function setEstado($estado)
    {
        $this->estado = $estado;

        return $this;
    }

    /**
     * Get estado
     *
     * @return string 
     */
    public function getEstado()
    {
        return $this->estado;
    }

    /**
     * Set condicionDomicilio
     *
     * @param string $condicionDomicilio
     * @return Empresa
     */
    public function setCondicionDomicilio($condicionDomicilio)
    {
        $this->condicionDomicilio = $condicionDomicilio;

        return $this;
    }

    /**
     * Get condicionDomicilio
     *
     * @return string 
     */
    public function getCondicionDomicilio()
    {
        return $this->condicionDomicilio;
    }

    /**
     * Set ubigeo
     *
     * @param string $ubigeo
     * @return Empresa
     */
    public function setUbigeo($ubigeo)
    {
        $this->ubigeo = $ubigeo;

        return $this;
    }

    /**
     * Get ubigeo
     *
     * @return string 
     */
    public function getUbigeo()
    {
        return $this->ubigeo;
    }

    /**
     * Set ruc
     *
     * @param string $ruc
     * @return Empresa
     */
    public function setRuc($ruc)
    {
        $this->ruc = $ruc;

        return $this;
    }

    /**
     * Get ruc
     *
     * @return string 
     */
    public function getRuc()
    {
        return $this->ruc;
    }
}
