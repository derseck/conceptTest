from django.db import models

# Create your models here.
class Cliente (models.Model):
    cc = models.CharField(max_length=13)
    nombres = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    telefono = models.CharField(max_length=20)

    def __str__(self):
        return self.nombres +" "+ self.apellidos

class Producto (models.Model):
    referencia = models.CharField(max_length=15)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    cantidad = models.PositiveIntegerField(default = 1)
    precio = models.DecimalField(
        default = 0,
        decimal_places = 2,
        max_digits = 11
    )

    def __str__(self):
        return self.referencia +" - "+ self.nombre

class Orden (models.Model):
    referencia = models.CharField(max_length=15)
    cliente = models.ForeignKey(Cliente, null=True, on_delete=models.SET_NULL)
    fecha = models.DateField()

    def __str__(self):
        return self.referencia

class OrdenItem(models.Model):
    """
    This model is the relation between the product and the order.
    """
    orden = models.ForeignKey(Orden, null=True, on_delete=models.SET_NULL)
    producto = models.ForeignKey(Producto, null=True, on_delete=models.SET_NULL)
    cantidad = models.PositiveIntegerField( default = 1 )
    
    def __str__(self):
        """ Return quantity and title of product"""
        return f" Ref: {self.orden.referencia} - {self.producto.nombre} x {self.cantidad}"