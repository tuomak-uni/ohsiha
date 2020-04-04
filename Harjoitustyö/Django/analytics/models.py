from django.db import models
from django.conf import settings

# Create your models here.
""" class View(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    #map
    view_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{user}-{view_count}" """