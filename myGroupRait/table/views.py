from django.shortcuts import render
from django.http import HttpResponse
from .models import myGroupRait
from django.template import loader

def index(request):
	mostSuccessfulStudents = myGroupRait.objects.order_by('-points')[:7]
	template = loader.get_template('table/index.html')
	context = {
		'mostSuccessfulStudents': mostSuccessfulStudents
	}
	return HttpResponse(template.render(context,request))

def pointfilter(request, pointf):
	personFilter = myGroupRait.objects.filter(points=pointf)
	if personFilter.exists():
		for person in personFilter:
			return HttpResponse("<h1 align='center' style='color:blue; font-size:50px;'>"+person.surname+" "+person.name+" "+str(person.age)+" years old "+str(person.points)+" points")
	else:
		return HttpResponse("<h1 align='center' style='color:red; font-size:50px'>"+"Student does not found"+"</h1>")

def all(request):
	output = "<br>".join([q.name+" "+q.surname+" "+str(q.age)+" years old " + str(q.points) + " points." for q in myGroupRait.objects.all()])
	return HttpResponse("<h1 align='center' style='color:blue; font-size:50px; font-famili:sanserif;'>"+output+'</h1>')