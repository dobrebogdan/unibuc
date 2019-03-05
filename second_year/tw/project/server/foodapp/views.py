import json

from django.http import HttpResponseBadRequest, HttpResponse
from django.views.decorators.http import require_GET, require_POST

from .models import User, Restaurant, UserRestaurantDefaultPreference, RestaurantProduct


def api_ajax(f):
    def wrap(request, *args, **kwargs):
        if not request.is_ajax():
            return HttpResponseBadRequest()
        json_response = f(request, *args, **kwargs)
        return HttpResponse(json.dumps(json_response), content_type="application/json")
    wrap.__doc__ = f.__doc__
    wrap.__name__ = f.__name__
    return wrap


def api_get(f): return api_ajax(require_GET(f))


def api_post(f): return api_ajax(require_POST(f))


@api_get
def list_users(request):
    return list(map(lambda u: dict(id=u.id, name=u.name), User.objects.all()))


@api_get
def user_preferences(request):
    u = User.objects.get(id=int(request.GET["userId"]))
    restaurants = list(Restaurant.objects.all())
    default_preferences = list(UserRestaurantDefaultPreference.objects.filter(user=u))
    all_product_ids = []
    for preference in default_preferences:
        all_product_ids += list(preference.products.all().values_list('id', flat=True))
    products = list(RestaurantProduct.objects.filter(id__in=all_product_ids))

    return {
        "user": {
            "id": u.id,
            "name": u.name,
        },
        "restaurants": list(map(lambda r: dict(id=r.id, name=r.name), restaurants)),
        "products": list(map(lambda p: dict(
            id=p.id,
            name=p.name,
            description=p.description,
            price=p.price,
            restaurantId=p.restaurant_id,
        ), products)),
        "defaultPreferences": list(map(lambda p: dict(
            id=p.id,
            userId=p.user_id,
            restaurantId=p.restaurant_id,
            productIds=list(p.products.all().values_list('id', flat=True)),
        ), default_preferences)),
    }


@api_get
def list_restaurant_products(request):
    return list(map(lambda p: dict(
        id=p.id,
        name=p.name,
        price=p.price,
        description=p.description,
        restaurantId=p.restaurant_id
    ), RestaurantProduct.objects.filter(restaurant_id=int(request.GET["restaurantId"]))))


@api_get
def list_restaurants(request):
    return list(map(lambda r: dict(
        id=r.id,
        name=r.name,
    ), Restaurant.objects.all()))


@api_post
def compile_order(request):
    preferences = UserRestaurantDefaultPreference.objects.filter(restaurant_id=int(request.POST["restaurantId"]))
    products = []
    for preference in preferences:
        products += list(map(lambda p: dict(
            id=p.id,
            name=p.name,
            description=p.description,
            price=p.price,
            restaurantId=p.restaurant_id,
        ), preference.products.all()))
    return products


@api_post
def save_user_restaurant_default_preference(request):
    preference, _ = UserRestaurantDefaultPreference.objects.get_or_create(
        user_id=int(request.POST["userId"]),
        restaurant_id=int(request.POST["restaurantId"])
    )

    preference.products.set(list(RestaurantProduct.objects.filter(id__in=request.POST.getlist("productIds[]"))))
    preference.save()
    return {"success": True}
