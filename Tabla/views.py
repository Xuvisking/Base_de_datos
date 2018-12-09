from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
#
# funcion que hace una Consulta simple y devuelve un "recibido"
def answer(request):
    send = ("recibido")
    return HttpResponse(send)

# En esta funcion hace INSERT de los datos a la tabla Persona, reciviendo Json
@csrf_exempt #==> esto es para saltarse protocolos de seguridad
def IngresoTabla(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)

    if response['Municipalidad']== 'Lo Prado':
        direc = 'AV. Loprado'
        if response ['Sucursal']== 'Sucursal A':
            dirSUC = 'Av. juan'
        else :
            dirSUC = 'Av. Pedro'
    elif response['Municipalidad']== 'Maipu':
        direc = 'Plaza de maipu'
        if response ['Sucursal']== 'Sucursal A':
            dirSUC = 'Av. Diego'
        else :
            dirSUC = 'Av. Maria'
    else:
        direc = 'AV. Pudh'
        if response ['Sucursal']== 'Sucursal A':
            dirSUC = 'Av. eeuu'
        else :
            dirSUC = 'Av. luisito comunica'
    #--------------------------------------
    #Persona
    insert_persona = Persona.objects.create(
        Rut=response['Rut'],
        Nombre=response['Nombre'],
        Apellido_P=response['Apellido_P'],
        Apellido_M=response['Apellido_M'],
        Direccion=response['Direccion'],
        Fecha_nacimiento=response['Fecha_nacimiento']
    )
    #Vehiculo
    insert_vehiculo = Vehiculo.objects.create(
        Patente = response['Patente'],
        Modelo = response['Modelo'],
        Marca = response['Marca'],
        year = response['Anoauto'],
        Num_chasis = response['Nchasis'],
        Num_motor = response['Nmotor'],
        Rut_persona = Persona.objects.get(Rut=response['Rut'])
    )
    #Municipalidad
    insert_municipalidad = Municipalidad.objects.create(
        Muni_id = response['Muniid'],
        Nombre = response['Municipalidad'],
        Direccion = direc
    )
    #Sucursal
    insert_sucursal = Sucursal.objects.create(
        Sucursal_id = response['Sucid'],
        Munin_id = Municipalidad.objects.get(Muni_id=response['Muniid']),
        Direccion = dirSUC
    )
    #PC = permiso de circulacion
    insert_PC = P_circulacion.objects.create(
        PCir_id = response['Perid'],
        Fecha_vencimiento= response['Fechaper'],
        Patente_vehiculo = Vehiculo.objects.get(Patente=response['Patente']),
        Precio = response['Precioper'],
        Sucursal_id = Sucursal.objects.get(Sucursal_id=response['Sucid']),
    )
    #RT = revision tecnica
    insert_RT = R_tecnica.objects.create(
        RTec_id = response['Revisionid'],
        Vigencia = response['Vigenciarev'],
        Patente_vehiculo = Vehiculo.objects.get(Patente=response['Patente']),
    )
    #SO = seguro obligatorio
    insert_SO = S_obligatorio.objects.create(
        SObl_id = response['Soid'],
        Fecha_vencimiento = response['Fechaso'],
        Patente_vehiculo = Vehiculo.objects.get(Patente=response['Patente']),
    )
    #Multa
    insert_multa = Multa.objects.create(
        Multa_id = response['Multaid'],
        Patente_vehiculo = Vehiculo.objects.get(Patente=response['Patente']),
        Valor = response['Valormulta'],
        Fecha_emision = response['Fechamulta'],
        descripcion = response['Desmulta'],
        estado = response['Estmulta']
    )
    #---------------------------------------
    response = HttpResponse("Tabla creada")
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

# En esta funcion hace INSERT de los datos a la tabla Vehiculo con relacion del rut de la tabla persona, reciviendo Json,
@csrf_exempt
def IngresoTablaVehiculo(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    insert = Vehiculo.objects.create(Patente=response['Patente'],
    Modelo=response['Modelo'],
    Marca=response['Marca'],
    year=response['year'],
    Num_chasis=response['Num_chasis'],
    Num_motor=response['Num_motor'],
    Rut_persona=Persona.objects.get(Rut=response['Rut_persona']))
    return HttpResponse("Tabla creada")

# funcion que hace SELECT en la tabla
def Tabla_Persona(request):
    #retorna todos los datos de la tabla
    get = Persona.objects.all()
    print(get)
    #retorna todos los datos correspondiente al rut 123456789
    get1 = Persona.objects.get(Rut=123456789)
    print(get1)
    #retorna todas las claves que tengan el nombre de Juanito
    get2 = Persona.objects.all().filter(Nombre="Juanito")
    print(get2)
    #retorna todos los valores de Apellido_P y Apellido_M
    get3 = Persona.objects.all().values('Apellido_P', 'Apellido_M')
    print(get3)
    return HttpResponse(get)

@csrf_exempt
def consultaTabla(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = Persona.objects.get(Rut=response['Rut'])
    response =Vehiculo.objects.all().filter(Rut_persona=response)
    response = Multa.objects.all().filter(Patente_vehiculo=response[0]).values ('estado')
    resultado = ("Su estado es: ", response[0]['estado'])
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

# funcion que hace DELETE en la tabla
@csrf_exempt
def deleteTabla(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    delTab = Persona.objects.get(pk = response['Rut'])
    delTab.delete()
    response = HttpResponse("Rut eliminado")
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

# funcion que hace UPDATE en la tabla
@csrf_exempt
def updateTabla(request):
    response = json.loads(request.body.decode("utf-8"))
    Persona.objects.filter(Rut = response['Rut']).update(Nombre = response['Nombre'])
    print(response)
    return HttpResponse('updated')
