<?php

namespace AppBundle\Util;

class Waka
{
    public function readTime($text)
    {
        $words = str_word_count(strip_tags($text));
        $min = floor($words / 200);
        if ($min === 0) {
            return '1 min';
        }

        return $min.'mins';
    }
}
