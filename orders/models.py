from django.db import models

# Create your models here.
class Basics(models.Model):
    Basic = models.CharField(max_length=64)
    Size = models.CharField(max_length=64)
    Price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.Basic} {self.Size} ${self.Price} "

class Toppings(models.Model):
    Topping = models.CharField(max_length=64)
    Price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.Topping} is ${self.Price}"

class Subs(models.Model):
    Sub = models.CharField(max_length=64)
    Price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.Sub} is ${self.Price}"

class Salads(models.Model):
    Salad = models.CharField(max_length=64)
    Price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.Salad} is ${self.Price}"

class Salad_adding(models.Model):
    Adding = models.CharField(max_length=64)
    Price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.Adding} is ${self.Price}"

class Beverages(models.Model):
    Beverage = models.CharField(max_length=64)
    Price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.Beverage} is ${self.Price}"

class Pastas(models.Model):
    Pasta = models.CharField(max_length=64)
    Price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.Pasta} is ${self.Price}"

class Pasta_adding(models.Model):
    Pasta_adding = models.CharField(max_length=64)
    Price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.Pasta_adding} is ${self.Price}"


class Order(models.Model):
    order = models.CharField(max_length=64, default="0")
    bill = models.CharField(max_length=64, default="0")
    user = models.CharField(max_length=64, default="0")
    Total_price = models.DecimalField(max_digits=5, decimal_places=2, default="0")
    finished = models.CharField(max_length=64, default="pending")
    def __str__(self):
        return f"{self.user} ordered {self.order}, should pay ${self.bill}, {self.finished}"
