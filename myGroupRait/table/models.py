from django.db import models

class myGroupRait(models.Model):
	name = models.CharField(max_length=20, default='none')
	surname = models.CharField(max_length=20, default='none')
	age = models.IntegerField(default=0)
	points = models.IntegerField(default=60)
	def __str__(self):
		return self.surname
