from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response 
from .serializers import BookSerializer,RegisterSerializer
from .models import Books
from rest_framework.decorators import api_view
# from knox.models import AuthToken
# Create your views here.

@api_view(['POST'])
def registerUser(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        data={}
        if serializer.is_valid():
            user = serializer.save()
            data['email'] = user.email
            data['username'] = user.username
            data['response'] = 'successfully register a new user'
        else:
            data = serializer.errors
        return Response(data)        
    



@api_view(['GET'])
def bookList(request):
    books = Books.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addBook(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)    


@api_view(['PUT'])
def updateBook(request, pk):
    books = Books.objects.get(id=pk)
    serializer = BookSerializer(data=request.data, instance=books)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)   

@api_view(['DELETE'])
def deleteBook(request, pk):
    books = Books.objects.get(id=pk)
    books.delete()
    return Response('deleted')

