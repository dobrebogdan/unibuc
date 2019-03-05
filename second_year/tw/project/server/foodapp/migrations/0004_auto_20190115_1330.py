# Generated by Django 2.1.5 on 2019-01-15 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('foodapp', '0003_restaurantproduct_description'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='restaurantproduct',
            unique_together={('name', 'restaurant')},
        ),
        migrations.AlterUniqueTogether(
            name='userrestaurantdefaultpreference',
            unique_together={('user', 'restaurant')},
        ),
    ]
