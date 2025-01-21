from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
import uuid
from django.core.validators import MaxValueValidator, MinValueValidator

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
    

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def _str_(self):
        return f"{self.email}"
    
class RoomType(models.Model):
    ROOM_TYPES = [
        ('single', 'Single'),
        ('double', 'Double'),
        ('suite', 'Suite'),
        ('family', 'Family'),
        ('economy', 'Economy'),
    ]
    name = models.CharField(max_length=20, choices=ROOM_TYPES)

    def __str__(self):
        return self.name
    
class Room(models.Model):
    number = models.CharField(max_length=10)
    image = models.ImageField(upload_to='media/room_images/', null=True, blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    description = models.TextField()
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
      return f'Room {self.number} ({self.room_type})'

class Service(models.Model):
    name = models.CharField(max_length=50, unique=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    STATUS_CHOICES = [
        ('booked', 'Booked'),
        ('cancelled', 'Cancelled'),
        ('checked_in', 'Checked In'),
        ('checked_out', 'Checked Out'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='booked')
    services = models.ManyToManyField(Service, related_name='bookings')

    cost_per_night = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    total_cost= models.DecimalField(max_digits=15, decimal_places=2, default=0)
    time = models.DateTimeField(auto_now_add=True, null=True)
    modified = models.DateTimeField(auto_now=True, null=False)

    # def save(self, *args, **kwargs):
    # # Calculate total cost based on check-in, check-out, and services
    # self.update_total_cost()
    # super().save(*args, **kwargs)

    # def update_total_cost(self):
    #     # Duration of stay
    #     duration = (self.check_out - self.check_in).days
    #     base_cost = self.room.cost * duration  # assuming room cost per night
    #     service_cost = sum(service.cost for service in self.services.all())
    #     self.total_cost = base_cost + service_cost


    def __str__(self):
        return f'Booking by {self.user} for {self.room} from {self.check_in} to {self.check_out}'

class Review(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='room_reviews')
    name = models.CharField(max_length=80, blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    time = models.DateTimeField(auto_now_add=True, null=True)
    modified = models.DateTimeField(auto_now=True, null=False)

    def get_display_name(self):
        if self.name:
            return self.name
        elif self.user:
            return f"Comment by {self.user} on {self.room}"
        else:
            return "No comment available."


    def __str__(self):
        return f"Comment by {self.get_display_name()} on {self.room}"