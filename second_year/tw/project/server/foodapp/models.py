from django.db import models


class User(models.Model):
    name = models.CharField(max_length=128)

    class Meta:
        db_table = "user"


class Restaurant(models.Model):
    name = models.CharField(max_length=128)

    class Meta:
        db_table = "restaurant"


class RestaurantProduct(models.Model):
    name = models.CharField(max_length=128)
    description = models.CharField(max_length=2048)
    price = models.IntegerField()
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)

    class Meta:
        unique_together = (("name", "restaurant"), )
        db_table = "restaurant_product"


class UserRestaurantDefaultPreference(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    products = models.ManyToManyField(RestaurantProduct)

    class Meta:
        db_table = "user_restaurant_default_preference"
        unique_together = (("user", "restaurant"), )
