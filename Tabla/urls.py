from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.http import HttpResponse
from . import views

urlpatterns = [
    path('', views.answer, name='answer'),
    url(r'^consultaTabla/$', views.consultaTabla, name='consultaTabla'),
    url(r'^IngresoTabla/$', views.IngresoTabla, name='IngresoTabla'),
    url(r'^DelPersona/$', views.deleteTabla, name='deleteTabla'),
    url(r'^UpdPersona/$', views.updateTabla, name='updateTabla'),
    url(r'^BD1/$', views.BD1, name='BD1'),
    url(r'^BD2/$', views.BD2, name='BD2'),
    url(r'^BD3/$', views.BD3, name='BD3'),
    url(r'^BD4/$', views.BD4, name='BD4'),
    url(r'^BD5/$', views.BD5, name='BD5'),
    url(r'^BD6/$', views.BD6, name='BD6'),
    url(r'^BD7/$', views.BD7, name='BD7'),
    url(r'^BD8/$', views.BD8, name='BD8'),
    url(r'^BD9/$', views.BD9, name='BD9'),
    url(r'^BD10/$', views.BD10, name='BD10'),
    url(r'^BD11/$', views.BD11, name='BD11'),
    url(r'^BD12/$', views.BD12, name='BD12'),
    url(r'^BD13/$', views.BD13, name='BD13'),
    url(r'^BD14/$', views.BD14, name='BD14'),
    url(r'^BD15/$', views.BD15, name='BD15'),
    url(r'^Addmulta/$', views.Addmulta, name='Addmulta'),

]
