# movies/models.py
from django.db import models

class Movie(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    genres = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    image = models.URLField()

    def __str__(self):
        return self.name
