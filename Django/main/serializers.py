from rest_framework import serializers
from .models import Cliente, Orden, OrdenItem, Producto

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('id', 'cc', 'nombres', 'apellidos', 'telefono')

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ('id', 'referencia', 'nombre', 'descripcion', 'cantidad', 'precio')

class OrdenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orden
        fields = ('id', 'referencia', 'cliente', 'fecha')

class OrdenItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenItem
        fields = ('id', 'orden', 'producto', 'cantidad')
