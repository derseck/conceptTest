from django.shortcuts import render
from rest_framework import generics

from .models import Cliente, Orden, OrdenItem, Producto
from .serializers import ClienteSerializer, OrdenItemSerializer, OrdenSerializer, ProductoSerializer

# Create your views here.
class ClienteList(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ClienteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ProductoList(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class OrdenList(generics.ListCreateAPIView):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer

class OrdenDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer

class OrdenListByClient(generics.ListAPIView):
    serializer_class = OrdenSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the client as determined by the client portion of the URL.
        """
        client = self.kwargs['client']
        return Orden.objects.filter(cliente=client)

class OrdenItemList(generics.ListCreateAPIView):
    queryset = OrdenItem.objects.all()
    serializer_class = OrdenItemSerializer

class OrdenItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrdenItem.objects.all()
    serializer_class = OrdenItemSerializer

class OrdenItemListByOrden(generics.ListAPIView):
    serializer_class = OrdenItemSerializer

    def get_queryset(self):
        """
        This view should return a list of all the item purchases for
        the client as determined by the orden portion of the URL.
        """
        orden = self.kwargs['orden']
        return OrdenItem.objects.filter(orden=orden)