from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.http import HttpResponse
from . import views

urlpatterns = [
    path('', views.answer, name='answer'),
    url(r'^IngresoTabla/$', views.IngresoTabla, name='IngresoTabla'),
    url(r'^GetPersona/$', views.Tabla_Persona, name='Tabla_Persona'),
    url(r'^DelPersona/$', views.deleteTabla, name='deleteTabla'),
    url(r'^UpdPersona/$', views.updateTabla, name='updateTabla'),
    url(r'^IngresoTablaVehiculo/$', views.IngresoTablaVehiculo, name='IngresoTablaVehiculo'),
]
