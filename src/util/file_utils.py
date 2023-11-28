import os

from imagekit import register, ImageSpec
from imagekit.processors import ResizeToFill

from config import settings


class PosterNotFound(ImageSpec):
    processors = [ResizeToFill(137, 192)]
    format = 'PNG'
    options = {'quality': 60}

register.generator('main:poster-not-found', PosterNotFound)

def overwrite_storage_media(filepath):
    fullname = os.path.join(settings.MEDIA_ROOT, filepath) # type: ignore[attr-defined] # pylint: disable=no-member # noqa: no-member
    if os.path.exists(fullname):
        os.remove(fullname)