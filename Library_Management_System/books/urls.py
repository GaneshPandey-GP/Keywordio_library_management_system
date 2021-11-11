from django.urls import path, include
from . import views

urlpatterns = [
    path('register',views.registerUser, name="register"),
  

    path('',views.bookList, name="bookList"),
    path('add',views.addBook, name="addBook"),
    path('update/<str:pk>',views.updateBook, name="updateBook"),
    path('delete/<str:pk>',views.deleteBook, name="deleteBook"),
]
