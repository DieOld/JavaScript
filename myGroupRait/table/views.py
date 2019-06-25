from django.shortcuts import render
from django.http import HttpResponse
from .models import myGroupRait
from django.template import loader

def index(request):
	mostSuccessfulStudents = myGroupRait.objects.order_by('-points')[:5]
	output = "<br>".join([q.name+" "+q.surname+" has "+str(q.points)+" points" for q in mostSuccessfulStudents])
	return HttpResponse("<h1 align='center' style='color:blue; font-size:50px'>"+output+'</h1>')
def pointfilter(request, pointf):
	personFilter = myGroupRait.objects.filter(points=pointf)
	if personFilter.exists():
		for person in personFilter:
			return HttpResponse("<h1 align='center' style='color:blue; font-size:50px;'>Student is found. It`s "+person.surname+"")
	else:
		return HttpResponse("<h1 align='center' style='color:red; font-size:50px'>"+"Student does not found"+"</h1>")

def all(request):
	output = "<br>".join([q.name+" "+q.surname+" "+str(q.age)+" years old " + str(q.points) + " points." for q in myGroupRait.objects.all()])
	return HttpResponse("<h1 align='center' style='color:blue; font-size:50px; font-famili:sanserif;'>"+output+'</h1>')