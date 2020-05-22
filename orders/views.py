from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import requests

from .models import *


# Create your views here.
def index(request):
    testlist = []
    testlist.append("tttttt");
    context = {
        "Basics": Basics.objects.all(),
        "Beverages": Beverages.objects.all(),
        "Salads": Salads.objects.all(),
        "Subs": Subs.objects.all(),
        "Pastas": Pastas.objects.all(),
        "Toppings": Toppings.objects.all(),
        #"smalls": Basics.objects.filter(Size="small"),
        "smalls":testlist,
        "bigs": Basics.objects.filter(Size="big"),
        "Addings":Salad_adding.objects.all()
    }
    return render(request, "orders/index.html", context)


def user(request):
    if not request.user.is_authenticated:
        return render(request, "orders/login_wrong.html", {"message": None})
    context = {
        "user": request.session['username']
    }
    return render(request, "orders/user.html", context)


def login_view(request):
    username = request.POST["username"]
    password = request.POST["password"]
    request.session['username'] = username
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return render(request, "orders/user.html")
    else:
        return render(request, "orders/login_wrong.html",{"message":"Wrong username or password. Have you been registered?"})

def logout_view(request):
    try:
        del request.session['username']
        logout(request)
        return render(request, "orders/user.html")
    except KeyError:
        if request.user.is_authenticated:
            logout(request)
            return render(request, "orders/user.html")
        else:
            return render(request, "orders/login_wrong.html", {"message":"You havn't log in yet"})


def register(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user_register = User.objects.create_user(username=username, password=password)
    return render(request, "orders/register_succ.html")

def checkout(request):
    try:
        username = request.session['username']
        order = request.POST["order_all"]
        bill = request.POST["bill"]
        o = Order.objects.create(user=username, order=order, bill=bill)
        return render(request, "orders/check_out.html",{"order": order})
    except KeyError:
        return render(request, "orders/login_wrong.html", {"message":"You havn't log in yet"})

def history(request):
    try:
        username = request.session['username']
        context = {
            "orders":Order.objects.filter(user=username)
        }
        return render(request, "orders/history.html", context)
    except KeyError:
        return render(request, "orders/login_wrong.html", {"message":"You havn't log in yet"})
