from django.urls import path
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^cliente$', views.ClienteList.as_view()),
    url(r'^cliente/(?P<pk>[0-9]+)$', views.ClienteDetail.as_view()),
    url(r'^producto$', views.ProductoList.as_view()),
    url(r'^producto/(?P<pk>[0-9]+)$', views.ProductoDetail.as_view()),
    url(r'^orden$', views.OrdenList.as_view()),
    url(r'^orden/(?P<pk>[0-9]+)$', views.OrdenDetail.as_view()),
    url(r'^orden/cliente/(?P<client>[0-9]+)$', views.OrdenListByClient.as_view()),
    url(r'^ordenItem$', views.OrdenItemList.as_view()),
    url(r'^ordenItem/(?P<pk>[0-9]+)$', views.OrdenItemDetail.as_view()),
    url(r'^ordenItem/orden/(?P<orden>[0-9]+)$', views.OrdenItemListByOrden.as_view()),
]
