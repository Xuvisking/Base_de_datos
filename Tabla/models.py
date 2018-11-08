from django.db import models

# Create your models here.
#--------------------------
# En esta seccion se hace la construccion (CREATE) de las tablas, donde las clases son las entidades
# y el contenido de estas son los atributos, donde clave primaria se escoje con primary_key=True
# como parametro en el atributo a escojer
#--------------------------
# Para hacer la relacion:
#
# one-to-one se agrega:
# models.OneToOneField(
#     clase_a_heredar,
#     on_delete=models.CASCADE,
# )
#
# many-to-one se agrega:
# models.ForeignKey(Clase_a_heredar, on_delete=models.CASCADE)
#
# many-to-many se agrega:
# models.ManyToManyField(Clase_a_heredar)

class Persona(models.Model):
    Rut = models.IntegerField(primary_key=True)
    Nombre = models.CharField(max_length=200)
    Apellido_P = models.CharField(max_length=200)    
    Apellido_M = models.CharField(max_length=200)  
    Direccion = models.CharField(max_length=200)   
    Fecha_nacimiento = models.DateField(blank=True)


class Vehiculo(models.Model):
    Nombre = models.CharField(max_length=200,primary_key=True)
    Modelo = models.CharField(max_length=200)
    Marca = models.CharField(max_length=200)
    year = models.DateField()
    Num_chasis = models.IntegerField()
    Num_motor = models.IntegerField()
    Rut_persona = models.ForeignKey(Persona, on_delete=models.CASCADE)

class Municipalidad(models.Model):
    Muni_id = models.CharField(max_length=200,primary_key=True)
    Nombre = models.CharField(max_length=200)
    Direccion = models.CharField(max_length=200)

class Sucursal(models.Model):
    Sucursal_id = models.CharField(max_length=200,primary_key=True)
    Munin_id = models.ForeignKey(Municipalidad, on_delete=models.CASCADE)
    Direccion = models.CharField(max_length=200)

class P_circulacion(models.Model):
    PCir_id = models.CharField(max_length=200,primary_key=True)
    Fecha_vencimiento= models.DateField()
    Patente = models.OneToOneField(
        Vehiculo,
        on_delete=models.CASCADE,
    )
    Precio = models.IntegerField()
    Sucursal_id = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

class R_tecnica(models.Model):
    RTec_id = models.IntegerField(primary_key=True)
    Vigencia = models.DateField()
    Patente = models.OneToOneField(
        Vehiculo,
        on_delete=models.CASCADE,
    )
    num_chasis = models.IntegerField()
    num_motor = models.IntegerField()

class S_obligatorio(models.Model):
    SObl_id = models.CharField(max_length=200,primary_key=True)
    Fecha_vencimiento = models.DateField()
    Patente = models.OneToOneField(
        Vehiculo,
        on_delete=models.CASCADE,
    )
    
class Multa(models.Model):
    Multa_id = models.CharField(max_length=200,primary_key=True)
    Patente = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    Muni_id = models.CharField(max_length=200)
    Valor = models.IntegerField()
    Fecha_emision = models.DateField()
    descripcion = models.CharField(max_length=200)
    estado = models.CharField(max_length=200)
