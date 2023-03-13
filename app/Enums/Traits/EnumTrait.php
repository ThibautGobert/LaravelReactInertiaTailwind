<?php

namespace App\Enums\Traits;

trait EnumTrait
{
    public static function getConstants(): array
    {
        return parent::getConstants();
    }

    public static function asFullArray()
    {
        $result = [];
        foreach (static::asArray() as $key => $value) {
            $result[] = [
                'value' => $value,
                'label' => static::getDescription($value),
                'key' => static::getKey($value),
            ];
        }
        return $result;
    }
}
