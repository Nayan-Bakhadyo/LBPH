from django.db import models
from django.core.exceptions import ValidationError

class UserDetail(models.Model):
    id=models.IntegerField
    name = models.CharField(max_length=200)
    user_id = models.IntegerField('ID')
    email = models.CharField(max_length=200)
  
class Detected(models.Model):
    id=models.IntegerField
    user_id = models.IntegerField('ID')
    date = models.DateField('Detected date')
    time = models.TimeField('Detected time')
    def __str__(self):
        return self.name
    class Meta:
        db_table = "detected"
 

   

    