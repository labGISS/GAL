from django.urls import path

from . import views

urlpatterns = [
    path('explore/', views.ExploreView.as_view(), name="explore"),
    path('info/', views.InfoView.as_view(), name="info"),
    path('map/', views.get_map_data, name="get_map_data"),
]
