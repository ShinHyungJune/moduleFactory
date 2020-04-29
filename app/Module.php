<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Module extends Model implements HasMedia
{
    use SoftDeletes, HasMediaTrait;

    protected $fillable = ["title", "body", "html", "css", "js"];

    protected $appends = ["img"];

    public function registerMediaCollections(Media $media = null)
    {
        // 단일 이미지 파일이어야만 할 경우에는 끝에 singleFile() 추가
        $this->addMediaCollection("images")->useDisk("s3")->singleFile();
    }

    public function getImgAttribute()
    {
        if($this->hasMedia('images')) {
            // $url = $this->getMedia('images')[0]->getFullUrl();
            $url = $this->getMedia('images')[0];

            return $url;
        }

        return null;
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
