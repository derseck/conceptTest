from django.contrib import admin
from .models import Cliente, Orden, OrdenItem, Producto

# Register your models here.
admin.site.register(Cliente)
admin.site.register(Producto)
admin.site.register(Orden)
admin.site.register(OrdenItem)