from django.shortcuts import render
from data.models import Park

#import json
from django.http import HttpResponse
import datetime

def homeScreen(request):
    now = datetime.datetime.now()
    dt_html = "<html><body>It is now %s.</body></html>" % now
    context = {}
    context['parks'] = Park.objects.order_by('alueen_nimi')
    context['dt'] = dt_html
    return render(request, 'home.html', context=context)
