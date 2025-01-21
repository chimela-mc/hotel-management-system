from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(CustomerUser)
admin.site.register(RoomType)
admin.site.register(Room)
admin.site.register(Booking)
admin.site.register(Service)
admin.site.register(Review)