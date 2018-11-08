from django.shortcuts import render
from django.http import HttpResponse
from .models import Persona
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
#
# funcion que hace una Consulta simple y devuelve un "recibido"
def answer(request):
    send = ("recibido")
    return HttpResponse(send)

# En esta funcion hace INSERT de los datos a la tabla con reciviendo Json
@csrf_exempt #==> esto es para saltarse protocolos de seguridad
def IngresoTabla(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    insert = Persona.objects.create(Rut=response['Rut'],
    Nombre=response['Nombre'],
    Apellido_P=response['Apellido_P'],
    Apellido_M=response['Apellido_M'],
    Direccion=response['Direccion'],
    Fecha_nacimiento=response['Fecha_nacimiento'])
    return HttpResponse("Tabla creada")

# funcion que hace SELECT en la tabla
def Tabla_Persona(request):
    get = Persona.objects.all()[:5]
    print(get)
    lel = Persona.objects.get(Rut=123456789)
    print(lel)
    lel2 = Persona.objects.all().filter(Nombre="Juanito")
    print(lel2)
    lel3 = Persona.objects.all().values('Apellido_P', 'Apellido_M')
    print(lel3)
    return HttpResponse(get)

# funcion que hace DELETE en la tabla
@csrf_exempt
def deleteTabla(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    delTab = Persona.objects.get(pk = response['Rut'])
    delTab.delete()
    return HttpResponse('deleted')

# funcion que hace UPDATE en la tabla
@csrf_exempt
def updateTabla(request):
    response = json.loads(request.body.decode("utf-8"))
    Persona.objects.filter(Rut = response['Rut']).update(Nombre = response['Nombre'])
    print(response)
    return HttpResponse('updated')
