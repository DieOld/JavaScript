from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('<int:pointf>/',views.pointfilter, name='pointfilter'),
	path('all/', views.all, name='all.urls')
]