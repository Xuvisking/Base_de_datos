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

@csrf_exempt
def updateTabla(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    if response['Nombre']=='':
        Nombreaux= Persona.objects.get(Rut=response['Rut']).value('Nombre')
    else:
        Nombreaux = response['Nombre']

    if response['Apellido_P']=='':
        Apellido_Paux= Persona.objects.get(Rut=response['Rut']).value('Apellido_P')
    else:
        Apellido_Paux = response['Apellido_P']

    if response['Apellido_M']=='':
        Apellido_Maux= Persona.objects.get(Rut=response['Rut']).value('Apellido_M')
    else:
        Apellido_Maux = response['Apellido_M']

    if response['Direccion']=='':
        Direccionaux = Persona.objects.get(Rut=response['Rut']).value('Direccion')
    else:
        Direccionaux = response['Direccion']

    if response['Fecha_nacimiento']=='':
        Fecha_nacimientoaux= Persona.objects.get(Rut=response['Rut']).value('Fecha_nacimiento')
    else:
        Fecha_nacimientoaux = response['Fecha_nacimiento']

    Persona.objects.filter(Rut = response['Rut']).update(
        Nombre = Nombreaux,
        Apellido_P = Apellido_Paux,   
        Apellido_M = Apellido_Maux, 
        Direccion = Direccionaux,
        Fecha_nacimiento = Fecha_nacimientoaux
        )
    response = HttpResponse('Tabla actualizada!')
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

@csrf_exempt
def BD1(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = Vehiculo.objects.all().filter(Patente=response['Patente']).values('Rut_persona')
    print(response)
    response2 = Persona.objects.all().filter(Rut=response[0]['Rut_persona'] ).values('Nombre')
    print(response2)
    resultado = ("el dueño es: ", response2[0]['Nombre'] ,", con el rut: ", response[0]['Rut_persona'] )
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD2(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = P_circulacion.objects.all().filter(Patente_vehiculo=response['Patente']).values ('Fecha_vencimiento')
    print(response)
    resultado = ("Vence el (Y-M-D): ", response[0]['Fecha_vencimiento'])
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD3(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = P_circulacion.objects.all().filter(Patente_vehiculo=response['Patente']).values('Sucursal_id')
    response = Sucursal.objects.all().filter(Sucursal_id=response[0]['Sucursal_id']).values('Munin_id')
    response = Municipalidad.objects.all().filter(Muni_id=response[0]['Munin_id']).values('Nombre')
    resultado = ("La municipalidad es: ", response[0]['Nombre'])
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD4(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = P_circulacion.objects.all().filter(Patente_vehiculo=response['Patente']).values('Precio')
    resultado = ("El precio es: ", response[0]['Precio'])
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD5(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = Multa.objects.all().filter(Patente_vehiculo=response['Patente']).values('descripcion')
    x=0
    for i in response:
        resultado2 = (" Multa por : ", response[x]['descripcion'])
        print (resultado2)
        resultado1 += resultado2
        x=x+1
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD6(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    date = response['FDH']
    response = R_tecnica.objects.all().filter(Patente_vehiculo=response['Patente']).values('Vigencia')
    if str(response[0]['Vigencia']) < date:
        resultado = "Esta vencido"
    else:
        resultado = "Esta al dia"
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD7(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    date = response['FDH']
    response = S_obligatorio.objects.all().filter(Patente_vehiculo=response['Patente']).values('Fecha_vencimiento')
    if str(response[0]['Fecha_vencimiento']) < date:
        resultado = "Esta vencido"
    else:
        resultado = "Esta al dia"
    response = HttpResponse(resultado)
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD8(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = P_circulacion.objects.all().filter(Fecha_vencimiento=response['FDH'])
    print(response)
    aux=""
    x=0
    if response == None:
        resultado = "Ninguno de la fecha"

    else:
        for i in response:
            print(x)
            aux2=P_circulacion.objects.all().filter(PCir_id=i.PCir_id).values('Patente_vehiculo')
            aux = aux + " " + str(aux2[0]['Patente_vehiculo'])
            x+=1
    aux = "Los vehiculos son: "+ aux
    response = HttpResponse(aux)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD9(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = Vehiculo.objects.all().filter(Rut_persona=response['Rut'])
    aux=""
    x=0
    if response == None:
        resultado = "Ninguno de la fecha"
    else:
        for i in response:
            x+=1
    aux = ("Tiene : ",x)
    
    response = HttpResponse(aux)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD10(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = Vehiculo.objects.all().filter(Patente=response['Patente']).values('Marca')
    resultado=("Es de Marca : ",response[0]['Marca'])
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD11(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = Vehiculo.objects.all().filter(Patente=response['Patente']).values('Rut_persona')
    response = Persona.objects.all().filter(Rut=response[0]['Rut_persona']).values('Direccion')
    resultado = ("La direccion es : ", response[0]['Direccion'])
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD12(request):
    response = json.loads(request.body.decode("utf-8"))
    Date= response['FDH']
    x=0
    print(response)
    response = Vehiculo.objects.all().filter(Rut_persona=response['Rut'])
    for i in response:
        aux2 = P_circulacion.objects.all().filter(Patente_vehiculo=i.Patente).values('Fecha_vencimiento')
        if str(aux2[0]['Fecha_vencimiento'])< Date:
            x+=1
    resultado=("Tiene ",x, " autos que no tiene el permiso de circulacion al dia")
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD13(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    x=0
    muni = response["muni"]
    Marca = response ["Marca"]
    response = Vehiculo.objects.all().filter(Marca=response['Marca'])
    print(response)
    for i in response:
        aux = P_circulacion.objects.all().filter(Patente_vehiculo=i.Patente).values("Sucursal_id")
        aux = Sucursal.objects.all().filter(Sucursal_id=aux[0]['Sucursal_id']).values("Munin_id")
        aux = Municipalidad.objects.all().filter(Muni_id=aux[0]['Munin_id']).values("Nombre")
        if aux[0]["Nombre"]==muni:
            x+=1
    resultado = ("Hay ", x ," vehiculos de la marca ", Marca, " en ",muni)
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD14(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = Multa.objects.all().filter(Patente_vehiculo=response['Patente']).values('estado')
    print (response)
    if response[0]['estado']=='No pagado':
        resultado=("No puede obtener revision tecnica ya que no posee pagada su multa")
    else:
        resultado=("Si puede obetner revision tecnica")
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response

@csrf_exempt
def BD15(request):
    response = json.loads(request.body.decode("utf-8"))
    print(response)
    response = P_circulacion.objects.all().filter(Patente_vehiculo=response['Patente']).values('Fecha_vencimiento')
    aux= (str(response[0]['Fecha_vencimiento'])).split("-")
    resultado = ("Lo saco el dia : ", str(int(aux[0])-4),"-",aux[1],"-",aux[2])
    response = HttpResponse(resultado)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response
